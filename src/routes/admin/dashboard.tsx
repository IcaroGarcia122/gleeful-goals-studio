import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getDashboardStats } from '@/lib/cms.functions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MousePointer2, Users, TrendingUp, Calendar, CheckCircle2, Circle, Loader2 } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'

export const Route = createFileRoute('/admin/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  const queryClient = useQueryClient()
  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => getDashboardStats(),
  })

  const { data: recentReservations } = useQuery({
    queryKey: ['recent-reservations'],
    queryFn: async () => {
      const { data, error } = await supabase.from('guests').select('*').order('created_at', { ascending: false }).limit(5)
      if (error) throw error
      return data
    }
  })

  const { data: tasks, isLoading: loadingTasks } = useQuery({
    queryKey: ['dashboard-tasks'],
    queryFn: async () => {
      const { data, error } = await supabase.from('tasks').select('*').order('created_at', { ascending: false }).limit(5)
      if (error) throw error
      return data
    }
  })

  const toggleTaskMutation = useMutation({
    mutationFn: async ({ id, completed }: { id: string, completed: boolean }) => {
      const { error } = await supabase.from('tasks').update({ completed }).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['dashboard-tasks'] })
  })

  const cards = [
    { title: 'Cliques no Airbnb', value: stats?.clicks || 0, icon: MousePointer2, color: 'text-blue-600' },
    { title: 'Hóspedes Cadastrados', value: stats?.guests || 0, icon: Users, color: 'text-green-600' },
    { title: 'Taxa de Conversão', value: `${((stats?.conversionRate || 0.12) * 100).toFixed(1)}%`, icon: TrendingUp, color: 'text-amber-600' },
    { title: 'Próximos Check-ins', value: recentReservations?.filter(r => r.status === 'confirmed').length || 0, icon: Calendar, color: 'text-purple-600' },
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
          <h3 className="text-lg font-serif mb-6 text-[#24170F]">Atividades Recentes</h3>
          <div className="space-y-4">
            {recentReservations?.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground italic">Nenhuma atividade recente.</div>
            ) : (
              recentReservations?.map((res) => (
                <div key={res.id} className="flex items-center justify-between p-3 rounded-lg bg-[#F7F3EA]/50 border border-beige/10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
                      <Users className="w-4 h-4 text-gold" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#24170F]">{res.name}</p>
                      <p className="text-xs text-muted-foreground">{res.status}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {res.created_at ? new Date(res.created_at).toLocaleDateString() : '-'}
                  </span>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card className="border-none shadow-sm bg-white p-6">
          <h3 className="text-lg font-serif mb-6 text-[#24170F]">Tarefas de Hoje</h3>
          <div className="space-y-4">
            {loadingTasks ? <Loader2 className="animate-spin text-gold mx-auto" /> : 
             tasks?.length === 0 ? <p className="text-center italic text-muted-foreground">Sem tarefas.</p> :
             tasks?.map((task) => (
              <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg bg-[#F7F3EA]/50 border border-beige/10 group">
                <button onClick={() => toggleTaskMutation.mutate({ id: task.id, completed: !task.completed })}>
                  {task.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : (
                    <Circle className="w-4 h-4 text-gold" />
                  )}
                </button>
                <span className={`text-sm font-sans ${task.completed ? 'line-through text-muted-foreground' : 'text-[#24170F]'}`}>
                  {task.title}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

