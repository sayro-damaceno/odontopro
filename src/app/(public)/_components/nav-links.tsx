'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LogIn } from 'lucide-react'
import { Session } from 'next-auth'
import { handleRegister } from '../_actions/login'

const navItems = [{ href: '#profissionais', label: 'Profissionais' }]

interface NavLinksProps {
  setIsOpen: (open: boolean) => void
  session: Session | null | undefined
}

export function NavLinks({ setIsOpen, session }: NavLinksProps) {
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

      {session ? (
        <Link
          href="/dashboard"
          className="flex items-center justify-center gap-2"
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
