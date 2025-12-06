import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import fotoImg from '@/../public/foto1.png'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Professionals() {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl text-center mb-12 font-bold">
          Clínicas disponíveis
        </h2>

        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-0 overflow-hidden">
            <CardContent className="p-0">
              <div>
                <div>
                  <Image src={fotoImg} alt="Foto da clínica" />
                </div>
              </div>

              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Clínica centro</h3>

                    <p className="text-sm text-gray-500">
                      Rua x, centro, Campo Grande - MS
                    </p>
                  </div>

                  <div className="w-2.5 h-2.5 ms-2 rounded-full bg-emerald-500"></div>
                </div>

                <Link
                  href="/clinica/123"
                  className="bg-emerald-500 w-full hover:bg-emerald-400 text-white flex items-center justify-center py-2 rounded-md text-sm font-medium md:text-md"
                >
                  Agendar horário
                  <ArrowRight className="ml-2" />
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="p-0 overflow-hidden">
            <CardContent className="p-0">
              <div>
                <div>
                  <Image src={fotoImg} alt="Foto da clínica" />
                </div>
              </div>

              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Clínica centro</h3>

                    <p className="text-sm text-gray-500">
                      Rua x, centro, Campo Grande - MS
                    </p>
                  </div>

                  <div className="w-2.5 h-2.5 ms-2 rounded-full bg-emerald-500"></div>
                </div>

                <Link
                  href="/clinica/123"
                  className="bg-emerald-500 w-full hover:bg-emerald-400 text-white flex items-center justify-center py-2 rounded-md text-sm font-medium md:text-md"
                >
                  Agendar horário
                  <ArrowRight className="ml-2" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </section>
  )
}
