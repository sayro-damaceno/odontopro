'use client'

import React from 'react'
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

const navItems = [{ href: '#profissionais', label: 'Profissionais' }]

const NavLinks = ({ setIsOpen }: { setIsOpen: (open: boolean) => void }) => (
  <>
    {navItems.map((item) => (
      <Button
        key={item.href}
        asChild
        className="bg-transparent hover:bg-transparent text-black shadow-none"
        onClick={() => setIsOpen(false)}
      >
        <Link href={item.href}>{item.label}</Link>
      </Button>
    ))}
  </>
)

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-999 py-4 px-6 bg-white">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-3xl font-bold text-zinc-900">
          Odonto<span className="text-emerald-500">PRO</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-4">
          <NavLinks setIsOpen={setIsOpen} />
        </nav>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              className="cursor-pointer text-black hover:bg-transparent"
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
              <NavLinks setIsOpen={setIsOpen} />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
