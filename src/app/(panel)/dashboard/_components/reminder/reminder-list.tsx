'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Reminder } from '@/generated/prisma/client'
import { Plus, Trash } from 'lucide-react'
import { deleteReminder } from '../../_actions/delete-reminder'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ReminderContent } from './reminder-content'

interface ReminderListProps {
  reminders: Reminder[]
}

export function ReminderList({ reminders }: ReminderListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  async function handleDeleteReminder(id: string) {
    const response = await deleteReminder({ reminderId: id })

    if (response.error) {
      toast.error(response.error)
      return
    }

    toast.success(response.data)
  }

  return (
    <div className="flex flex-col gap-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-xl md:text-2xl font-bold">
            Lembretes
          </CardTitle>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus />
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Novo lembrete</DialogTitle>
                <DialogDescription>
                  Criar um novo lembrete para sua lista.
                </DialogDescription>
              </DialogHeader>

              <ReminderContent closeDialog={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent>
          {!reminders.length && (
            <p className="text-sm text-gray-500">
              Nenhum lembrete registrado...
            </p>
          )}

          <ScrollArea className="h-[340px] lg:max-h-[calc(100vh-15rem)] pr-0 w-full flex-1">
            {reminders.map((item) => (
              <article
                key={item.id}
                className="flex flex-wrap flex-row items-center justify-between p-2 bg-yellow-100 rounded-md mb-2"
              >
                <p className="text-sm lg:text-base">{item.description}</p>
                <Button
                  size="icon"
                  className="bg-red-500 hover:bg-red-400 shadow-none rounded-full"
                  onClick={() => handleDeleteReminder(item.id)}
                >
                  <Trash />
                </Button>
              </article>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
