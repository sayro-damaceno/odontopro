import { getTimesClinic } from '../../_data-access/get-times-clinic'
import { AppointmentsList } from './appointments-list'

export async function Appointments({ userId }: { userId: string }) {
  const user = await getTimesClinic({ userId: userId })

  console.log(user)

  return <AppointmentsList times={user.times} />
}
