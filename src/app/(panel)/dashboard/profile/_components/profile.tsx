'use client'

import { useState } from 'react'
import { ProfileFormData, useProfileForm } from './profile-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import imageTest from '@/../public/foto1.png'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ProfileContent() {
  const [selectedHours, setSelectedHours] = useState<string[]>([])
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  const form = useProfileForm()

  function generateTimeSlots(): string[] {
    const hours = []
    for (let i = 8; i <= 24; i++) {
      const hour = i.toString().padStart(2, '0')
      hours.push(`${hour}:00`, `${hour}:30`)
    }

    return hours
  }

  const hours = generateTimeSlots()

  function toggleHour(hour: string) {
    setSelectedHours((prev) =>
      prev.includes(hour)
        ? prev.filter((h) => h !== hour)
        : [...prev, hour].sort()
    )
  }

  const timeZones = Intl.supportedValuesOf('timeZone').filter(
    (zone) =>
      zone.startsWith('America/Sao_paulo') ||
      zone.startsWith('America/Fortaleza') ||
      zone.startsWith('America/Manaus') ||
      zone.startsWith('America/Cuiaba') ||
      zone.startsWith('America/Belem') ||
      zone.startsWith('America/Recife') ||
      zone.startsWith('America/Bahia') ||
      zone.startsWith('America/Santarem')
  )

  async function onSubmit(values: ProfileFormData) {
    console.log('Form Values:', values)
  }

  return (
    <div className="mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Meu Perfil</CardTitle>

              <CardContent className="space-y-6">
                <div className="flex justify-center">
                  <div className="bg-gray-200 relative h-40 w-40 rounded-full overflow-hidden">
                    <Image
                      src={imageTest}
                      alt="Foto da Clinica"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Completo</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Digite o nome da clínica..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Endereço da Clínica</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Digite o endereço da clínica..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone da Clínica</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Digite o telefone..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status da Clínica</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value ? 'active' : 'inactive'}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecione o status da clínica..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">
                                ATIVO (clínica aberta)
                              </SelectItem>
                              <SelectItem value="inactive">
                                INATIVO (clínica fechada)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <FormLabel>Configurar horários da clínica</FormLabel>

                    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between cursor-pointer"
                        >
                          Clique aqui para selecionar horários
                          <ChevronRight className="w-5 h-5 text-muted-foreground opacity-50" />
                        </Button>
                      </DialogTrigger>

                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Horários da clínica</DialogTitle>
                          <DialogDescription>
                            Selecione abaixo os horários de funcionamento da
                            clínica:
                          </DialogDescription>
                        </DialogHeader>

                        <section className="py-4">
                          <p className="text-sm text-muted-foreground mb-2">
                            Clique nos horários abaixo para marcar ou desmarcar:
                          </p>

                          <div className="grid grid-cols-5 gap-2">
                            {hours.map((hour) => (
                              <Button
                                key={hour}
                                variant="outline"
                                className={cn(
                                  'h-10',
                                  selectedHours.includes(hour) &&
                                    'border-2 border-emerald-500 text-primary'
                                )}
                                onClick={() => toggleHour(hour)}
                              >
                                {hour}
                              </Button>
                            ))}
                          </div>
                        </section>

                        <Button
                          onClick={() => setDialogIsOpen(false)}
                          className="w-full"
                        >
                          Fechar
                        </Button>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <FormField
                    control={form.control}
                    name="timeZone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Selecione o fuso horário</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecione o seu fuso horário..." />
                            </SelectTrigger>

                            <SelectContent>
                              {timeZones.map((zone) => (
                                <SelectItem key={zone} value={zone}>
                                  {zone.replace('_', ' ')}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-emerald-500 hover:bg-emerald-400 cursor-pointer"
                  >
                    Salvar alterações
                  </Button>
                </div>
              </CardContent>
            </CardHeader>
          </Card>
        </form>
      </Form>
    </div>
  )
}
