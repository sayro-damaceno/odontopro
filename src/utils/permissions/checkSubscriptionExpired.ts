'use server'

import { addDays, isAfter } from 'date-fns'
import { Session } from 'next-auth'
import { ResultPermissionProps } from './canPermissions'
import { TRIALS_DAYS } from './trials-limits'

export async function checkSubscriptionExpired(
  session: Session,
): Promise<ResultPermissionProps> {
  const trialEndDate = addDays(session?.user.createdAt, TRIALS_DAYS)

  if (isAfter(new Date(), trialEndDate)) {
    return {
      hasPermission: false,
      planId: 'EXPIRED',
      expired: true,
      plan: null,
    }
  }

  return {
    hasPermission: true,
    planId: 'TRIAL',
    expired: false,
    plan: null,
  }
}
