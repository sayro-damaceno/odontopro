import prisma from '@/lib/prisma'
import { addDays, differenceInDays, isAfter } from 'date-fns'
import { TRIALS_DAYS } from './trials-limits'

type subscriptionStatus = 'ACTIVE' | 'EXPIRED' | 'TRIAL'

interface SubscriptionCheckResult {
  subscriptionStatus: subscriptionStatus
  message: string
  planId: string
}

export async function checkSubscription(
  userId: string,
): Promise<SubscriptionCheckResult> {
  const user = await prisma.user.findFirst({
    where: { id: userId },
    include: { subscription: true },
  })

  if (!user) {
    throw new Error('Usuário não encontrado')
  }

  if (user.subscription && user.subscription.status === 'active') {
    return {
      subscriptionStatus: 'ACTIVE',
      message: 'Assinatura ativa.',
      planId: user.subscription.plan,
    }
  }

  const trialEndDate = addDays(user.createdAt, TRIALS_DAYS)

  if (isAfter(new Date(), trialEndDate)) {
    return {
      subscriptionStatus: 'EXPIRED',
      message: 'Seu período de teste expirou.',
      planId: 'TRIAL',
    }
  }

  const daysRemaining = differenceInDays(trialEndDate, new Date())

  return {
    subscriptionStatus: 'TRIAL',
    message: `Você está no período de teste gratuito. Faltam ${daysRemaining} dias.`,
    planId: 'TRIAL',
  }
}
