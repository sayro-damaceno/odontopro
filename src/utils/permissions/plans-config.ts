import { PlansProps } from '../plans'

export interface PlanDetailInfo {
  maxServices: number
}

export const PLANS_LIMITS: PlansProps = {
  BASIC: {
    maxServices: 3,
  },
  PROFESSIONAL: {
    maxServices: 50,
  },
}
