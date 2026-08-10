import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts'
import { MousePointer2, Users, TrendingUp, Smartphone, Monitor, Loader2, Calendar, CheckCircle2 } from 'lucide-react'

export const Route = createFileRoute('/admin/analytics')({
  component: Analytics,
})

function Analytics() {
  const { data: clickData, isLoading: loadingClicks } = useQuery({
    queryKey: ['analytics-clicks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('airbnb_clicks')
        .select('*')
        .order('created_at', { ascending: true })
      if (error) throw error
      return data
    }
  })

  const { data: guestData } = useQuery({
    queryKey: ['analytics-guests'],
    queryFn: async () => {
      const { data, error } = await supabase.from('guests').select('status, created_at')
      if (error) throw error
      return data
    }
  })

  // Process data for charts
  const clicksByDay = clickData?.reduce((acc: any, click) => {
    const day = new Date(click.created_at!).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
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

  const totalClicks = clickData?.length || 0
  const confirmedReservations = guestData?.filter(g => g.status === 'confirmed').length || 0
  const conversionRate = totalClicks > 0 ? ((confirmedReservations / totalClicks) * 100).toFixed(1) : 0

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-serif text-[#24170F]">Analytics</h2>
          <p className="text-muted-foreground font-sans">Desempenho real da sua landing page</p>
        </div>
        <div className="bg-gold/10 px-4 py-2 rounded-lg border border-gold/20">
          <span className="text-xs font-sans text-gold font-bold uppercase tracking-wider">Status: Ao Vivo</span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm bg-white p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
              <MousePointer2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-sans">Total de Cliques</p>
              <h3 className="text-2xl font-bold text-[#24170F]">{totalClicks}</h3>
            </div>
          </div>
        </Card>
        <Card className="border-none shadow-sm bg-white p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-xl text-green-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-sans">Reservas Confirmadas</p>
              <h3 className="text-2xl font-bold text-[#24170F]">{confirmedReservations}</h3>
            </div>
          </div>
        </Card>
        <Card className="border-none shadow-sm bg-white p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gold/10 rounded-xl text-gold">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-sans">Taxa de Conversão</p>
              <h3 className="text-2xl font-bold text-[#24170F]">{conversionRate}%</h3>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-sm bg-white p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-lg font-serif text-[#24170F] flex items-center justify-between">
              Cliques no Airbnb por Dia
              <span className="text-xs font-sans font-normal text-muted-foreground">Últimos 30 dias</span>
            </CardTitle>
          </CardHeader>
          <div className="h-[300px] w-full mt-4">
            {loadingClicks ? (
              <div className="flex items-center justify-center h-full"><Loader2 className="animate-spin text-gold" /></div>
            ) : chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorCliques" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C59A55" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#C59A55" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F7F3EA" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#888' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#888' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="cliques" stroke="#C59A55" fillOpacity={1} fill="url(#colorCliques)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground italic text-sm">Aguardando primeiros acessos...</div>
            )}
          </div>
        </Card>

        <Card className="border-none shadow-sm bg-white p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-lg font-serif text-[#24170F]">Origem do Tráfego</CardTitle>
          </CardHeader>
          <div className="space-y-6 mt-6">
            {deviceData.map((device) => {
              const percentage = totalClicks > 0 ? Math.round((device.value / totalClicks) * 100) : 0
              return (
                <div key={device.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <device.icon className="w-4 h-4 text-gold" />
                      <span className="font-sans font-medium text-[#24170F]">{device.name}</span>
                    </div>
                    <span className="font-bold text-[#24170F]">{device.value} ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-[#F7F3EA] h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-gold h-full rounded-full transition-all duration-1000" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </div>
  )
}
