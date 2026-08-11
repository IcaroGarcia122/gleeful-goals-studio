import { createFileRoute } from '@tanstack/react-router'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

export const Route = createFileRoute('/admin/automations')({
  component: AutomationsPage,
})

function AutomationsPage() {
  const queryClient = useQueryClient()

  const { data: automations, isLoading } = useQuery({
    queryKey: ['automations'],
    queryFn: async () => {
      const { data, error } = await supabase.from('whatsapp_automations').select('*')
      if (error) throw error
      return data
    }
  })

  const toggleAutomationMutation = useMutation({
    mutationFn: async ({ id, is_active }: { id: string, is_active: boolean }) => {
      const { error } = await supabase.from('whatsapp_automations').update({ is_active }).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['automations'] })
  })

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-3xl font-serif text-[#24170F]">Automações</h2>
        <p className="text-muted-foreground font-sans">Gerencie o envio automático de mensagens WhatsApp</p>
      </div>

      {isLoading ? <Loader2 className="animate-spin text-gold mx-auto" /> : 
        automations?.map(a => (
          <Card key={a.id} className="p-6 flex items-center justify-between">
            <div>
              <h4 className="font-semibold">{a.type}</h4>
              <p className="text-sm text-muted-foreground">{a.message_template}</p>
            </div>
            <Switch 
              checked={a.is_active || false} 
              onCheckedChange={(val) => toggleAutomationMutation.mutate({ id: a.id, is_active: val })}
            />
          </Card>
        ))}
    </div>
  )
}
