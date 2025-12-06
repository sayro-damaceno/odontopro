'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { NavLinks } from './nav-links'

export function Header() {
  const { data: session } = useSession()

  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-999 py-4 px-6 bg-white">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-3xl font-bold text-zinc-900">
          Odonto<span className="text-emerald-500">PRO</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-4">
          <NavLinks setIsOpen={setIsOpen} session={session} />
        </nav>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              className="text-black hover:bg-transparent"
              variant="ghost"
              size="icon"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-60 sm:w-[300px] z-9999 px-5">
            <SheetHeader></SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>Veja nossos links</SheetDescription>

            <nav className="flex flex-col space-y-4">
              <NavLinks setIsOpen={setIsOpen} session={session} />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
