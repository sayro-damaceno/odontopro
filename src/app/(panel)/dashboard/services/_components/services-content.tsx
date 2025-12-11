import { getAllServices } from '../_data-access/get-all-services'

interface ServicesContentProps {
  userId: string
}

export async function ServicesContent({ userId }: ServicesContentProps) {
  const services = await getAllServices({ userId })

  console.log(services)

  return <div>Services Content for user {userId}</div>
}
