'use client'

import { useState } from 'react'
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DialogServiceFormData,
  useDialogServiceForm,
} from './dialog-service-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { convertRealToCents } from '@/utils/convertCurrency'
import { createNewService } from '../_actions/create-service'
import { toast } from 'sonner'

interface DialogServiceProps {
  closeModal: () => void
}

export function DialogService({ closeModal }: DialogServiceProps) {
  const form = useDialogServiceForm()
  const [loading, setLoading] = useState(false)

  async function onSubmit(values: DialogServiceFormData) {
    setLoading(true)
    const priceInCents = convertRealToCents(values.price)
    const hours = parseInt(values.hours || '0')
    const minutes = parseInt(values.minutes || '0')

    const duration = hours * 60 + minutes

    const response = await createNewService({
      name: values.name,
      price: priceInCents,
      duration,
    })

    setLoading(false)

    if (response.error) {
      toast.error(response.error)

      return
    }

    toast.success('Serviço cadastrado com sucesso!')
    handleCloseModal()
  }

  function handleCloseModal() {
    form.reset()
    closeModal()
  }

  function changeCurrency(event: React.ChangeEvent<HTMLInputElement>) {
    let { value } = event.target

    value = value.replace(/\D/g, '')

    if (value) {
      value = (parseInt(value, 10) / 100).toFixed(2)
      value = value.replace('.', ',')
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }

    event.target.value = value
    form.setValue('price', value)
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Novo Serviço</DialogTitle>
        <DialogDescription>Adicione um novo serviço</DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form
          className="space-y-2 flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do serviço:</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Digite o nome do serviço..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor do serviço:</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Ex: 150,00"
                    onChange={changeCurrency}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <p className="font-semibold">Tempo de duração do serviço:</p>
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="hours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Horas:</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="1" min="0" type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="minutes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minutos:</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="0" min="0" type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            disabled={loading}
            type="submit"
            className="w-full text-white font-semibold"
          >
            {loading ? 'Cadastrando...' : 'Adicionar serviço'}
          </Button>
        </form>
      </Form>
    </>
  )
}
