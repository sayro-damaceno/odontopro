'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LogIn } from 'lucide-react'
import { handleRegister } from '../_actions/login'
import { useSession } from 'next-auth/react'

const navItems = [{ href: '#profissionais', label: 'Profissionais' }]

interface NavLinksProps {
  setIsOpen: (open: boolean) => void
}

export function NavLinks({ setIsOpen }: NavLinksProps) {
  const { data: session, status } = useSession()

  async function handleLogin() {
    await handleRegister('Github')
  }

  return (
    <>
      {navItems.map((item) => (
        <Button
          key={item.href}
          asChild
          className="bg-transparent hover:bg-transparent text-black shadow-none text-base font-normal"
          onClick={() => setIsOpen(false)}
        >
          <Link href={item.href} className="">
            {item.label}
          </Link>
        </Button>
      ))}

      {status === 'loading' ? (
        <></>
      ) : session ? (
        <Link
          href="/dashboard"
          className="flex items-center justify-center gap-2 bg-zinc-900 text-white py-2 rounded-md px-4"
        >
          Acessar clínica
        </Link>
      ) : (
        <Button onClick={handleLogin}>
          <LogIn />
          Portal da clínica
        </Button>
      )}
    </>
  )
}
