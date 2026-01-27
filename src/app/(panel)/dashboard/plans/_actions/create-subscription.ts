'use server'

import { Plan } from '@/generated/prisma/enums'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { stripe } from '@/utils/stripe'

interface SubscriptionProps {
  type: Plan
}

export async function createSubscription({ type }: SubscriptionProps) {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    return {
      error: 'Falha ao ativar plano.',
    }
  }

  const findUser = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  })

  if (!findUser) {
    return {
      error: 'Falha ao ativar plano.',
    }
  }

  let customerId = findUser.stripeCustomerId

  if (!customerId) {
    const stripeCustomer = await stripe.customers.create({
      email: findUser.email,
    })

    await prisma.user.update({
      where: { id: userId },
      data: { stripeCustomerId: stripeCustomer.id },
    })

    customerId = stripeCustomer.id
  }

  try {
    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price:
            type === 'BASIC'
              ? process.env.STRIPE_PLAN_BASIC
              : process.env.STRIPE_PLAN_PRO,
          quantity: 1,
        },
      ],
      metadata: {
        type: type,
      },
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    })

    return {
      sessionId: stripeCheckoutSession.id,
      url: stripeCheckoutSession.url,
    }
  } catch (error) {
    console.error('Error creating subscription:', error)
    return {
      error: 'Falha ao ativar plano.',
    }
  }
}
