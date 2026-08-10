import { createFileRoute } from '@tanstack/react-router'
import { Card } from '@/components/ui/card'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { useState } from 'react'
import { ptBR } from 'date-fns/locale'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { Plus, Trash2, Loader2, Calendar as CalendarIcon } from 'lucide-react'

export const Route = createFileRoute('/admin/calendar')({
  component: AdminCalendar,
})

function AdminCalendar() {
  const queryClient = useQueryClient()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [isBlocking, setIsBlocking] = useState(false)
  const [blockReason, setBlockReason] = useState('')

  const { data: guests } = useQuery({
    queryKey: ['admin-guests-dates'],
    queryFn: async () => {
      const { data, error } = await supabase.from('guests').select('check_in, check_out, name, status')
      if (error) throw error
      return data
    }
  })

  const { data: blockedDates, isLoading: loadingBlocks } = useQuery({
    queryKey: ['blocked-dates'],
    queryFn: async () => {
      const { data, error } = await supabase.from('guests').select('*').eq('status', 'cancelled').order('check_in')
      // Note: In a real app, I'd use a dedicated 'blocked_dates' table. 
      // For now, I'll filter for status 'cancelled' or just show the ones we add as 'blocked'
      const { data: all, error: err } = await supabase.from('guests').select('*').order('created_at')
      if (err) throw err
      return all.filter(g => g.notes?.includes('[BLOQUEIO]'))
    }
  })

  const blockMutation = useMutation({
    mutationFn: async () => {
      if (!selectedDate) return
      const dateStr = selectedDate.toISOString().split('T')[0]
      const { error } = await supabase.from('guests').insert([{
        name: 'DATA BLOQUEADA',
        check_in: dateStr,
        check_out: dateStr,
        status: 'pending',
        notes: `[BLOQUEIO] ${blockReason}`
      }])
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blocked-dates'] })
      setIsBlocking(false)
      setBlockReason('')
      toast.success('Data bloqueada com sucesso!')
    }
  })

  const deleteBlock = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('guests').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blocked-dates'] })
      toast.success('Bloqueio removido.')
    }
  })

  // Prepare modifiers for the calendar
  const reservedDates = guests?.filter(g => g.status === 'confirmed').map(g => ({
    from: g.check_in ? new Date(g.check_in) : new Date(),
    to: g.check_out ? new Date(g.check_out) : new Date()
  })) || []

  const blockedDays = blockedDates?.map(d => d.check_in ? new Date(d.check_in) : new Date()) || []

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-serif text-[#24170F]">Calendário</h2>
          <p className="text-muted-foreground font-sans">Gerencie datas disponíveis e bloqueadas</p>
        </div>
        <Button onClick={() => setIsBlocking(!isBlocking)} className="bg-gold text-white">
          <CalendarIcon className="w-4 h-4 mr-2" /> Bloquear Data
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 p-6 border-none shadow-sm bg-white">
          <CalendarComponent
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            locale={ptBR}
            className="w-full flex justify-center"
            modifiers={{
              booked: reservedDates,
              blocked: blockedDays
            }}
            modifiersClassNames={{
              booked: "bg-green-100 text-green-700 font-bold rounded-lg",
              blocked: "bg-red-100 text-red-700 font-bold rounded-lg"
            }}
            classNames={{
              months: "w-full space-y-4",
              month: "w-full space-y-4",
              table: "w-full border-collapse space-y-1",
              head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
              cell: "text-center text-sm p-0 relative focus-within:relative focus-within:z-20 w-full h-12",
              day: "h-12 w-full p-0 font-normal hover:bg-[#F7F3EA] rounded-lg transition-colors",
              day_selected: "bg-gold text-white hover:bg-gold/90 focus:bg-gold",
            }}
          />
        </Card>

        <div className="space-y-6">
          <Card className="p-6 border-none shadow-sm bg-white space-y-4">
            <h3 className="text-lg font-serif text-[#24170F]">Ações da Data</h3>
            {selectedDate ? (
              <div className="space-y-4">
                <p className="text-sm font-sans">
                  Data selecionada: <span className="font-bold text-gold">{selectedDate.toLocaleDateString('pt-BR')}</span>
                </p>
                {isBlocking ? (
                  <div className="space-y-3">
                    <Input 
                      placeholder="Motivo do bloqueio..." 
                      value={blockReason} 
                      onChange={e => setBlockReason(e.target.value)}
                    />
                    <div className="flex gap-2">
                      <Button onClick={() => blockMutation.mutate()} size="sm" className="bg-red-500 hover:bg-red-600 text-white">
                        Confirmar Bloqueio
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setIsBlocking(false)}>Cancelar</Button>
                    </div>
                  </div>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => setIsBlocking(true)} className="w-full">
                    Bloquear esta data
                  </Button>
                )}
              </div>
            ) : (
              <p className="text-sm italic text-muted-foreground">Selecione uma data no calendário.</p>
            )}
          </Card>

          <Card className="p-6 border-none shadow-sm bg-white">
            <h3 className="text-lg font-serif text-[#24170F] mb-4">Datas Bloqueadas</h3>
            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {loadingBlocks ? <Loader2 className="animate-spin text-gold mx-auto" /> : 
               blockedDates?.length === 0 ? <p className="text-xs italic text-muted-foreground">Nenhuma data bloqueada.</p> :
               blockedDates?.map(block => (
                <div key={block.id} className="flex items-center justify-between p-2 rounded bg-red-50 text-xs">
                  <span>{new Date(block.check_in!).toLocaleDateString('pt-BR')} - {block.notes?.replace('[BLOQUEIO] ', '') || 'Bloqueado'}</span>
                  <button onClick={() => deleteBlock.mutate(block.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

