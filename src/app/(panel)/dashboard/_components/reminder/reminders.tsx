import { getReminders } from '../../_data-access/get-reminders'

export async function Reminders({ userId }: { userId: string }) {
  const reminders = await getReminders({ userId })

  console.log('Reminders:', reminders)

  return <div>Reminders</div>
}
