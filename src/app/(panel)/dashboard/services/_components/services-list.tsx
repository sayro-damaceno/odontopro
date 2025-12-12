'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Pencil, Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DialogService } from './dialog-service'
import { Service } from '@/generated/prisma/client'
import { formatCurrency } from '@/utils/formatCurrency'

interface ServicesListProps {
  services: Service[]
}

export function ServicesList({ services }: ServicesListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  console.log(services)

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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

            <DialogContent>
              <DialogService closeModal={() => setIsDialogOpen(false)} />
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
                    <Button variant="ghost" size="icon">
                      <Pencil />
                    </Button>
                    <Button variant="ghost" size="icon">
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
