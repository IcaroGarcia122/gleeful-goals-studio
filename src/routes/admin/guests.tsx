import { createFileRoute } from '@tanstack/react-router'
import { Card } from '@/components/ui/card'
import { Users, Mail, Phone, Calendar as CalendarIcon, Tag } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/admin/guests')({
  component: GuestsManagement,
})

function GuestsManagement() {
  const { data: guests, isLoading } = useQuery({
    queryKey: ['admin-guests'],
    queryFn: async () => {
      const { data, error } = await supabase.from('guests').select('*').order('created_at', { ascending: false })
      if (error) throw error
      return data
    }
  })

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-serif text-[#24170F]">Hóspedes</h2>
          <p className="text-muted-foreground font-sans">Gerenciamento e histórico de hóspedes</p>
        </div>
      </div>

      <Card className="border-none shadow-sm bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#F7F3EA] text-[#24170F] text-xs uppercase tracking-wider font-sans font-semibold">
              <tr>
                <th className="px-6 py-4">Hóspede</th>
                <th className="px-6 py-4">Contato</th>
                <th className="px-6 py-4">Estadia</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-beige/10">
              {isLoading ? (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-muted-foreground italic font-sans">Carregando hóspedes...</td></tr>
              ) : guests?.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-muted-foreground italic font-sans">Nenhum hóspede cadastrado.</td></tr>
              ) : (
                guests?.map((guest) => (
                  <tr key={guest.id} className="hover:bg-[#F7F3EA]/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
                          <Users className="w-4 h-4 text-gold" />
                        </div>
                        <span className="font-medium text-[#24170F]">{guest.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground space-y-1">
                      <div className="flex items-center gap-2"><Mail className="w-3 h-3" /> {guest.email || '-'}</div>
                      <div className="flex items-center gap-2"><Phone className="w-3 h-3" /> {guest.phone || '-'}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-3 h-3" />
                        {guest.check_in ? new Date(guest.check_in).toLocaleDateString() : '-'} a {guest.check_out ? new Date(guest.check_out).toLocaleDateString() : '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold tracking-tighter ${
                        guest.status === 'confirmed' ? 'bg-green-100 text-green-700' : 
                        guest.status === 'pending' ? 'bg-amber-100 text-amber-700' : 
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {guest.status}
                      </span>
                    </td>
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
