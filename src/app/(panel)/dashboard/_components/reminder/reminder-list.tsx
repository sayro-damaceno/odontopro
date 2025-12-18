import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Reminder } from '@/generated/prisma/client'
import { Plus, Trash } from 'lucide-react'

interface ReminderListProps {
  reminders: Reminder[]
}

export function ReminderList({ reminders }: ReminderListProps) {
  console.log('Reminders:', reminders)
  return (
    <div className="flex flex-col gap-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-xl md:text-2xl font-bold">
            Lembretes
          </CardTitle>

          <Button>
            <Plus />
          </Button>
        </CardHeader>

        <CardContent>
          {!reminders.length && (
            <p className="text-sm text-gray-500">
              Nenhum lembrete registrado...
            </p>
          )}

          {reminders.map((item) => (
            <article
              key={item.id}
              className="flex flex-wrap flex-row items-center justify-between p-2 bg-yellow-100 rounded-md"
            >
              <p className="text-sm lg:text-base">{item.description}</p>
              <Button
                size="icon"
                className="bg-red-500 hover:bg-red-400 shadow-none rounded-full"
              >
                <Trash />
              </Button>
            </article>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
