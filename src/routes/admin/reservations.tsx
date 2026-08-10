import { createFileRoute } from '@tanstack/react-router'
import { Card } from '@/components/ui/card'
import { Users, Calendar, ArrowUpRight, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/admin/reservations')({
  component: ReservationsPage,
})

function ReservationsPage() {
  const reservations = [
    { id: 1, guest: 'Alice Silva', date: '14/08 - 16/08', status: 'Confirmada', type: 'Airbnb' },
    { id: 2, guest: 'Bruna Oliveira', date: '20/08 - 22/08', status: 'Finalizada', type: 'Manual' },
    { id: 3, guest: 'Higor Daniel', date: '28/08 - 30/08', status: 'Pendente', type: 'Airbnb' },
  ]

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-serif text-[#24170F]">Reservas</h2>
          <p className="text-muted-foreground font-sans">Controle central de todas as estadias</p>
        </div>
        <Button variant="outline" className="border-[#DCC9A5] text-[#24170F]">
          <Filter className="w-4 h-4 mr-2" /> Filtrar
        </Button>
      </div>

      <Card className="border-none shadow-sm bg-white overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#F7F3EA] text-[#24170F] text-xs uppercase tracking-wider font-sans font-semibold">
            <tr>
              <th className="px-6 py-4">Hóspede</th>
              <th className="px-6 py-4">Período</th>
              <th className="px-6 py-4">Origem</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-beige/10">
            {reservations.map((res) => (
              <tr key={res.id} className="hover:bg-[#F7F3EA]/30 transition-colors">
                <td className="px-6 py-4 font-medium text-[#24170F]">{res.guest}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground flex items-center gap-2">
                  <Calendar className="w-3 h-3" /> {res.date}
                </td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] px-2 py-0.5 rounded border ${
                    res.type === 'Airbnb' ? 'border-red-200 text-red-600 bg-red-50' : 'border-blue-200 text-blue-600 bg-blue-50'
                  }`}>
                    {res.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs font-semibold">{res.status}</td>
                <td className="px-6 py-4 text-right">
                  <Button variant="ghost" size="icon" className="text-gold">
                    <ArrowUpRight className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}