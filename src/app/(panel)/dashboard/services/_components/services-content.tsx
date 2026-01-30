import { canPermissions } from '@/utils/permissions/canPermissions'
import { getAllServices } from '../_data-access/get-all-services'
import { ServicesList } from './services-list'

interface ServicesContentProps {
  userId: string
}

export async function ServicesContent({ userId }: ServicesContentProps) {
  const services = await getAllServices({ userId })
  const permissions = await canPermissions({ type: 'service' })
  console.log('ServicesContent Permissions:', permissions)

  return (
    <ServicesList services={services.data || []} permission={permissions} />
  )
}
