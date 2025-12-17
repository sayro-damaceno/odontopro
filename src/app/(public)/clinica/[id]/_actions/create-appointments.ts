'use server'

import prisma from '@/lib/prisma'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  email: z.email('Email inválido'),
  phone: z.string().min(1, 'O telefone é obrigatório'),
  date: z.date(),
  serviceId: z.string().min(1, 'O serviço é obrigatório'),
  time: z.string().min(1, 'O horário é obrigatório'),
  clinicId: z.string().min(1, 'A clínica é obrigatória'),
})

type FormSchema = z.infer<typeof formSchema>

export async function createAppointment(formDate: FormSchema) {
  const schema = formSchema.safeParse(formDate)

  if (!schema.success) {
    return {
      error: schema.error.issues[0].message,
    }
  }

  try {
    const selectedDate = new Date(formDate.date)
    const year = selectedDate.getFullYear()
    const month = selectedDate.getMonth()
    const day = selectedDate.getDate()

    const appointmentDate = new Date(year, month, day, 0, 0, 0, 0)

    const newAppointment = await prisma.appointment.create({
      data: {
        name: formDate.name,
        email: formDate.email,
        phone: formDate.phone,
        time: formDate.time,
        appointmentDate: appointmentDate,
        serviceId: formDate.serviceId,
        userId: formDate.clinicId,
      },
    })

    return { data: newAppointment }
  } catch (error) {
    console.error('Error creating appointment:', error)
    return {
      error: 'Erro ao realizar agendamento.',
    }
  }
}
