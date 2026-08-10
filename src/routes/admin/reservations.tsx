import { createFileRoute } from '@tanstack/react-router'
import { Card } from '@/components/ui/card'
import { Users, Calendar, ArrowUpRight, Filter, Loader2, Plus, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

export const Route = createFileRoute('/admin/reservations')({
  component: ReservationsPage,
})

function ReservationsPage() {
  const queryClient = useQueryClient()
  const [isAdding, setIsAdding] = useState(false)
  
  // Data Fetching
  const { data: reservations, isLoading } = useQuery({
    queryKey: ['admin-reservations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('guests')
        .select('*')
        .order('check_in', { ascending: false })
      if (error) throw error
      return data
    }
  })

  // Update Status Mutation
  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string, status: string }) => {
      const { error } = await supabase.from('guests').update({ status }).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-reservations'] })
      toast.success('Status atualizado.')
    }
  })

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-serif text-[#24170F]">Reservas</h2>
          <p className="text-muted-foreground font-sans">Controle central de todas as estadias</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-[#DCC9A5] text-[#24170F]">
            <Filter className="w-4 h-4 mr-2" /> Filtrar
          </Button>
          <Button onClick={() => window.location.href = '/admin/guests'} className="bg-gold text-white">
            <Plus className="w-4 h-4 mr-2" /> Nova Reserva
          </Button>
        </div>
      </div>

      <Card className="border-none shadow-sm bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#F7F3EA] text-[#24170F] text-xs uppercase tracking-wider font-sans font-semibold">
              <tr>
                <th className="px-6 py-4">Hóspede</th>
                <th className="px-6 py-4">Período</th>
                <th className="px-6 py-4">Hóspedes</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-beige/10">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-gold mx-auto" />
                  </td>
                </tr>
              ) : reservations?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center italic text-muted-foreground">
                    Nenhuma reserva encontrada.
                  </td>
                </tr>
              ) : (
                reservations?.map((res) => {
                  const isBlocked = res.notes?.includes('[BLOQUEIO]')
                  return (
                    <tr key={res.id} className={`hover:bg-[#F7F3EA]/30 transition-colors ${isBlocked ? 'bg-red-50/30' : ''}`}>
                      <td className="px-6 py-4">
                        <div className="font-medium text-[#24170F]">{res.name}</div>
                        <div className="text-[10px] text-muted-foreground">{res.email || 'Sem e-mail'}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3 text-gold" />
                          {res.check_in ? new Date(res.check_in).toLocaleDateString('pt-BR') : '-'} a {res.check_out ? new Date(res.check_out).toLocaleDateString('pt-BR') : '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <Users className="w-3 h-3 inline mr-1 text-gold" /> {res.num_guests || 0}
                      </td>
                      <td className="px-6 py-4">
                        <select 
                          value={res.status || 'pending'}
                          onChange={(e) => updateStatus.mutate({ id: res.id, status: e.target.value })}
                          className={`text-[10px] px-2 py-1 rounded border bg-transparent font-semibold uppercase tracking-tighter ${
                            res.status === 'confirmed' ? 'border-green-200 text-green-700 bg-green-50' :
                            res.status === 'cancelled' ? 'border-red-200 text-red-700 bg-red-50' :
                            'border-yellow-200 text-yellow-700 bg-yellow-50'
                          }`}
                        >
                          <option value="pending">Pendente</option>
                          <option value="confirmed">Confirmada</option>
                          <option value="cancelled">Cancelada</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-gold"
                          onClick={() => toast.info(`Notas: ${res.notes || 'Nenhuma'}`)}
                        >
                          <Info className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
