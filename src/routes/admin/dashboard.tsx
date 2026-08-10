import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { getDashboardStats } from '@/lib/cms.functions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MousePointer2, Users, TrendingUp, Calendar } from 'lucide-react'

export const Route = createFileRoute('/admin/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => getDashboardStats(),
  })

  const cards = [
    { title: 'Cliques no Airbnb', value: stats?.clicks || 0, icon: MousePointer2, color: 'text-blue-600' },
    { title: 'Hóspedes Cadastrados', value: stats?.guests || 0, icon: Users, color: 'text-green-600' },
    { title: 'Taxa de Conversão', value: `${(stats?.conversionRate || 0) * 100}%`, icon: TrendingUp, color: 'text-amber-600' },
    { title: 'Próximos Check-ins', value: '0', icon: Calendar, color: 'text-purple-600' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-serif text-[#24170F]">Dashboard</h2>
        <p className="text-muted-foreground font-sans">Visão geral da sua hospedagem</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Card key={card.title} className="border-none shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {card.title}
              </CardTitle>
              <card.icon className={`w-4 h-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#24170F]">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm bg-white p-6">
          <h3 className="text-lg font-serif mb-6 text-[#24170F]">Próximas Reservas</h3>
          <div className="text-center py-12 text-muted-foreground italic">
            Nenhuma reserva pendente para os próximos dias.
          </div>
        </Card>

        <Card className="border-none shadow-sm bg-white p-6">
          <h3 className="text-lg font-serif mb-6 text-[#24170F]">Tarefas de Hoje</h3>
          <div className="space-y-4">
            {['Limpeza geral', 'Check-in às 14:00', 'Troca de toalhas'].map((task, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-[#F7F3EA]/50 border border-beige/10">
                <div className="w-4 h-4 rounded border border-gold" />
                <span className="text-sm font-sans">{task}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
