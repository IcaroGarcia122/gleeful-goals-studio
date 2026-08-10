import { createFileRoute } from '@tanstack/react-router'
import { Card } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { MousePointer2, Users, Eye, Clock } from 'lucide-react'

export const Route = createFileRoute('/admin/analytics')({
  component: AnalyticsPage,
})

const data = [
  { name: 'Seg', visitas: 400, cliques: 24 },
  { name: 'Ter', visitas: 300, cliques: 18 },
  { name: 'Qua', visitas: 600, cliques: 45 },
  { name: 'Qui', visitas: 800, cliques: 62 },
  { name: 'Sex', visitas: 500, cliques: 35 },
  { name: 'Sáb', visitas: 900, cliques: 88 },
  { name: 'Dom', visitas: 700, cliques: 54 },
]

function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-serif text-[#24170F]">Analytics</h2>
        <p className="text-muted-foreground font-sans">Acompanhe o desempenho da sua landing page</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Visitantes Únicos', value: '4.2k', icon: Users },
          { label: 'Visualizações', value: '12.8k', icon: Eye },
          { label: 'Cliques Airbnb', value: '326', icon: MousePointer2 },
          { label: 'Tempo Médio', value: '2m 14s', icon: Clock },
        ].map((stat) => (
          <Card key={stat.label} className="p-6 border-none shadow-sm bg-white flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#F7F3EA] flex items-center justify-center">
              <stat.icon className="w-6 h-6 text-[#C59A55]" />
            </div>
            <div>
              <p className="text-xs font-sans text-muted-foreground uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-bold text-[#24170F]">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6 border-none shadow-sm bg-white">
          <h3 className="text-lg font-serif mb-6 text-[#24170F]">Acessos por Dia</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="visitas" fill="#C59A55" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 border-none shadow-sm bg-white">
          <h3 className="text-lg font-serif mb-6 text-[#24170F]">Conversão (Cliques)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="cliques" stroke="#24170F" strokeWidth={2} dot={{ fill: '#24170F' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  )
}