import { Subscription } from '@/generated/prisma/client'
import prisma from '@/lib/prisma'
import { Session } from 'next-auth'
import { getPlan } from './get-plans'
import { PLANS } from '../plans'
import { checkSubscriptionExpired } from './checkSubscriptionExpired'
import { ResultPermissionProps } from './canPermissions'

export async function canCreateService(
  subscription: Subscription | null,
  session: Session,
): Promise<ResultPermissionProps> {
  try {
    const serviceCount = await prisma.service.count({
      where: {
        userId: session?.user?.id,
      },
    })

    if (subscription && subscription.status === 'active') {
      const plan = subscription.plan
      const planLimits = await getPlan(plan)

      console.log('Service Count:', planLimits)

      return {
        hasPermission:
          planLimits.maxServices === null ||
          serviceCount <= planLimits.maxServices,
        planId: subscription.plan,
        expired: false,
        plan: PLANS[subscription.plan],
      }
    }

    const checkTestLimit = await checkSubscriptionExpired(session)

    return checkTestLimit
  } catch (error) {
    console.error('Error in canCreateService:', error)
    return {
      hasPermission: false,
      planId: 'EXPIRED',
      expired: false,
      plan: null,
    }
  }
}
