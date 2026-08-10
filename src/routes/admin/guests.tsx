import { createFileRoute } from '@tanstack/react-router'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'
import { Users, Mail, Phone, Calendar as CalendarIcon, UserPlus } from 'lucide-react'

export const Route = createFileRoute('/admin/guests')({
  component: GuestsManagement,
})

function GuestsManagement() {
  const queryClient = useQueryClient()
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })

  const { data: guests, isLoading } = useQuery({
    queryKey: ['admin-guests'],
    queryFn: async () => {
      const { data, error } = await supabase.from('guests').select('*').order('created_at', { ascending: false })
      if (error) throw error
      return data
    }
  })

  const addGuestMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase.from('guests').insert([data])
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-guests'] })
      setIsAdding(false)
      setFormData({ name: '', email: '', phone: '' })
      toast.success('Hóspede adicionado com sucesso!')
    },
    onError: () => toast.error('Erro ao adicionar hóspede.')
  })

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-serif text-[#24170F]">Hóspedes</h2>
          <p className="text-muted-foreground font-sans">Gerenciamento e histórico de hóspedes</p>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)} className="bg-[#24170F] text-white">
          <UserPlus className="w-4 h-4 mr-2" /> Novo Hóspede
        </Button>
      </div>

      {isAdding && (
        <Card className="p-6 bg-[#F7F3EA]/30 border border-[#DCC9A5]/20">
          <h3 className="font-serif text-lg mb-4">Cadastrar Novo Hóspede</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input placeholder="Nome Completo" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <Input placeholder="E-mail" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            <Input placeholder="Telefone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
          </div>
          <div className="mt-4 flex gap-2">
            <Button onClick={() => addGuestMutation.mutate(formData)} disabled={addGuestMutation.isPending} className="bg-gold text-white">Salvar</Button>
            <Button variant="ghost" onClick={() => setIsAdding(false)}>Cancelar</Button>
          </div>
        </Card>
      )}

      <Card className="border-none shadow-sm bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#F7F3EA] text-[#24170F] text-xs uppercase tracking-wider font-sans font-semibold">
              <tr>
                <th className="px-6 py-4">Hóspede</th>
                <th className="px-6 py-4">Contato</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-beige/10">
              {isLoading ? (
                <tr><td colSpan={3} className="px-6 py-12 text-center text-muted-foreground italic font-sans">Carregando hóspedes...</td></tr>
              ) : (
                guests?.map((guest) => (
                  <tr key={guest.id} className="hover:bg-[#F7F3EA]/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-[#24170F]">{guest.name}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {guest.email} • {guest.phone}
                    </td>
                    <td className="px-6 py-4 text-xs font-bold uppercase text-gold">{guest.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
