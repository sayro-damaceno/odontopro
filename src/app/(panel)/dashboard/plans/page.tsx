import getSession from '@/lib/getSession'
import { redirect } from 'next/navigation'
import { GridPlans } from './_components/grid-palns'

export default async function Plans() {
  const session = await getSession()

  if (!session) {
    redirect('/')
  }

  return (
    <div>
      <GridPlans />
    </div>
  )
}
