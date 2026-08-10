import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { MousePointer2, Users, TrendingUp, Smartphone, Monitor, Loader2 } from 'lucide-react'

export const Route = createFileRoute('/admin/analytics')({
  component: Analytics,
})

function Analytics() {
  const { data: clickData, isLoading: loadingClicks } = useQuery({
    queryKey: ['analytics-clicks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('airbnb_clicks')
        .select('created_at, device')
        .order('created_at', { ascending: true })
      if (error) throw error
      return data
    }
  })

  // Process data for charts
  const clicksByDay = clickData?.reduce((acc: any, click) => {
    const day = new Date(click.created_at!).toLocaleDateString('pt-BR', { weekday: 'short' })
    acc[day] = (acc[day] || 0) + 1
    return acc
  }, {})

  const chartData = Object.keys(clicksByDay || {}).map(day => ({
    name: day,
    cliques: clicksByDay[day]
  }))

  const deviceData = [
    { name: 'Mobile', value: clickData?.filter(c => c.device === 'mobile').length || 0, icon: Smartphone },
    { name: 'Desktop', value: clickData?.filter(c => c.device === 'web' || c.device === 'desktop').length || 0, icon: Monitor },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-serif text-[#24170F]">Analytics</h2>
        <p className="text-muted-foreground font-sans">Desempenho da sua landing page</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-sm bg-white p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-lg font-serif text-[#24170F]">Cliques no Airbnb (Últimos Dias)</CardTitle>
          </CardHeader>
          <div className="h-[300px] w-full mt-4">
            {loadingClicks ? (
              <div className="flex items-center justify-center h-full"><Loader2 className="animate-spin text-gold" /></div>
            ) : chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartGrid strokeDasharray="3 3" vertical={false} stroke="#F7F3EA" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    cursor={{ fill: '#F7F3EA' }}
                  />
                  <Bar dataKey="cliques" fill="#C59A55" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground italic">Sem dados suficientes.</div>
            )}
          </div>
        </Card>

        <Card className="border-none shadow-sm bg-white p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-lg font-serif text-[#24170F]">Dispositivos</CardTitle>
          </CardHeader>
          <div className="space-y-6 mt-6">
            {deviceData.map((device) => (
              <div key={device.name} className="flex items-center justify-between p-4 rounded-xl bg-[#F7F3EA]/30 border border-[#DCC9A5]/10">
                <div className="flex items-center gap-3">
                  <device.icon className="w-5 h-5 text-gold" />
                  <span className="font-sans font-medium text-[#24170F]">{device.name}</span>
                </div>
                <span className="text-xl font-bold text-[#24170F]">{device.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
