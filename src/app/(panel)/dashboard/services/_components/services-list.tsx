'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Pencil, Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DialogService } from './dialog-service'
import { Service } from '@/generated/prisma/client'
import { formatCurrency } from '@/utils/formatCurrency'
import { deleteService } from '../_actions/delete-service'
import { toast } from 'sonner'

interface ServicesListProps {
  services: Service[]
}

export function ServicesList({ services }: ServicesListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)

  async function handleDeleteService(serviceId: string) {
    const response = await deleteService({ serviceId })

    if (response.error) {
      toast.error(response.error)
      return
    }
    toast.success(response.data)
  }

  async function handleEditService(service: Service) {
    setEditingService(service)
    setIsDialogOpen(true)
  }

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        setIsDialogOpen(open)
        if (!open) {
          setEditingService(null)
        }
      }}
    >
      <section className="mx-auto">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-xl md:text-2xl font-bold">
              Serviços
            </CardTitle>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4" />
              </Button>
            </DialogTrigger>

            <DialogContent
              onInteractOutside={(e) => {
                e.preventDefault()
                setIsDialogOpen(false)
                setEditingService(null)
              }}
            >
              <DialogService
                closeModal={() => {
                  setIsDialogOpen(false)
                  setEditingService(null)
                }}
                serviceId={editingService ? editingService.id : undefined}
                initialValues={
                  editingService
                    ? {
                        name: editingService.name,
                        price: (editingService.price / 100)
                          .toFixed(2)
                          .replace('.', ','),
                        hours: Math.floor(
                          editingService.duration / 60
                        ).toString(),
                        minutes: (editingService.duration % 60).toString(),
                      }
                    : undefined
                }
              />
            </DialogContent>
          </CardHeader>

          <CardContent>
            <section className="space-y-4">
              {services.map((service) => (
                <article
                  key={service.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{service.name}</span>
                    <span className="text-gray-500">-</span>
                    <span className="text-gray-400">
                      {formatCurrency(service.price / 100)}
                    </span>
                  </div>

                  <div>
                    <Button
                      onClick={() => handleEditService(service)}
                      variant="ghost"
                      size="icon"
                    >
                      <Pencil />
                    </Button>
                    <Button
                      onClick={() => {
                        handleDeleteService(service.id)
                      }}
                      variant="ghost"
                      size="icon"
                    >
                      <X />
                    </Button>
                  </div>
                </article>
              ))}
            </section>
          </CardContent>
        </Card>
      </section>
    </Dialog>
  )
}
