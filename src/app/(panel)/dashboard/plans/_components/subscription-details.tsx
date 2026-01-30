'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Subscription } from '@/generated/prisma/client'
import { subscriptionPlans } from '@/utils/plans'
import { createPortalCustomer } from '../_actions/create-portal-customer'
import { toast } from 'sonner'

interface SubscriptionDetailsProps {
  subscription: Subscription
}

export default function SubscriptionDetails({
  subscription,
}: SubscriptionDetailsProps) {
  const subscriptionInfo = subscriptionPlans.find(
    (plan) => plan.id === subscription.plan,
  )

  async function handleManageSubscription() {
    const portal = await createPortalCustomer()

    if (portal.error) {
      toast.error('Ocorreu um erro ao criar o portal de assinatura.')
      return
    }
    window.location.href = portal.sessionId
  }

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Seu Plano Atual</CardTitle>
        <CardDescription>Sua assinatura está ativa!</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <h3 className="text-lg md:text-xl font-bold">
            {subscription.plan === 'BASIC' ? 'BASIC' : 'PROFISSIONAL'}
          </h3>

          <div className="bg-green-500 text-white w-fit px-4 py-1 rounded-md">
            {subscription.status === 'active' ? 'ATIVO' : 'INATIVO'}
          </div>
        </div>

        <ul className="list-disc list-inside space-y-2">
          {subscriptionInfo?.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <Button onClick={handleManageSubscription}>Gerenciar assinatura</Button>
      </CardFooter>
    </Card>
  )
}
