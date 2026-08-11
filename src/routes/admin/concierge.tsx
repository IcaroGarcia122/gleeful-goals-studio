import { createFileRoute } from '@tanstack/react-router'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'
import { Plus, Trash2, Loader2, Save } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/admin/concierge')({
  component: ConciergePage,
})

function ConciergePage() {
  const queryClient = useQueryClient()
  
  const { data: settings, isLoading: loadingSettings } = useQuery({
    queryKey: ['concierge-settings'],
    queryFn: async () => {
      const { data, error } = await supabase.from('concierge_settings').select('*').single()
      if (error) throw error
      return data
    }
  })

  const { data: knowledge, isLoading: loadingKnowledge } = useQuery({
    queryKey: ['knowledge-base'],
    queryFn: async () => {
      const { data, error } = await supabase.from('knowledge_base').select('*')
      if (error) throw error
      return data
    }
  })

  const updateSettingsMutation = useMutation({
    mutationFn: async (newData: any) => {
      if (!settings?.id) return;
      const { error } = await supabase.from('concierge_settings').update(newData).eq('id', settings.id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['concierge-settings'] })
      toast.success('Configurações atualizadas!')
    }
  })

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-3xl font-serif text-[#24170F]">Concierge IA</h2>
        <p className="text-muted-foreground font-sans">Gerencie o comportamento e a base de conhecimento do seu Concierge</p>
      </div>

      {loadingSettings ? <Loader2 className="animate-spin text-gold mx-auto" /> : (
        <Card className="p-6 border-none shadow-sm bg-white space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-serif">Configurações de Personalidade</h3>
            <Input 
              value={settings?.name || ''} 
              onChange={(e) => updateSettingsMutation.mutate({ name: e.target.value })}
              placeholder="Nome do Concierge"
            />
            <Textarea 
              value={settings?.welcome_message || ''}
              onChange={(e) => updateSettingsMutation.mutate({ welcome_message: e.target.value })}
              placeholder="Mensagem de boas-vindas"
            />
          </div>
        </Card>
      )}

      <div className="space-y-4">
        <h3 className="text-xl font-serif text-[#24170F]">Base de Conhecimento</h3>
        {loadingKnowledge ? <Loader2 className="animate-spin text-gold" /> : 
         knowledge?.map((item) => (
           <Card key={item.id} className="p-4 flex items-center justify-between">
             <div>
               <p className="font-semibold text-[#24170F]">{item.question}</p>
               <p className="text-sm text-muted-foreground">{item.answer}</p>
             </div>
           </Card>
         ))}
      </div>
    </div>
  )
}
