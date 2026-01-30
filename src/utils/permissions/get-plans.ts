'use server'

import { Plan } from '@/generated/prisma/enums'
import { PLANS_LIMITS } from './plans-config'

export async function getPlan(planId: Plan) {
  return PLANS_LIMITS[planId]
}
