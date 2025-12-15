import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const userId = searchParams.get('userId')
  const dateParam = searchParams.get('date')

  if (!userId || userId === 'null' || !dateParam || dateParam === 'null') {
    return NextResponse.json(
      { error: 'Nenhum agendamento encontrado.' },
      { status: 400 }
    )
  }

  try {
    const [year, month, day] = dateParam.split('-').map(Number)
    const startDate = new Date(year, month - 1, day, 0, 0, 0)
    const endDate = new Date(year, month - 1, day, 23, 59, 59, 999)

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Nenhum agendamento encontrado.' },
        { status: 400 }
      )
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        userId: userId,
        appointmentDate: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        service: true,
      },
    })

    console.log('agendamentos', appointments)
    const blockedSlots = new Set<string>()

    for (const apt of appointments) {
      // EX: apt.time = "10:00", apt.service.duration = 60 (1h)
      const requiredSlots = Math.ceil(apt.service.duration / 30)
      const startIndex = user.times.indexOf(apt.time)

      if (startIndex !== -1) {
        for (let i = 0; i < requiredSlots; i++) {
          const blockedSlot = user.times[startIndex + i]
          if (blockedSlot) {
            blockedSlots.add(blockedSlot)
          }
        }
      }
    }

    // appointments.forEach((apt) => {
    //   const startIndex = user.times.indexOf(apt.time)
    //   if (startIndex !== -1) {
    //     const requiredSlots = Math.ceil(apt.service.duration / 30)
    //     user.times
    //       .slice(startIndex, startIndex + requiredSlots)
    //       .forEach((slot) => blockedTimes.add(slot))
    //   }
    // })

    const blockedTimes = Array.from(blockedSlots)

    return NextResponse.json(blockedTimes)
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Nenhum agendamento encontrado.' },
      { status: 400 }
    )
  }
}
