import { createFileRoute } from '@tanstack/react-router'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'
import { Settings as SettingsIcon, Bell, Lock, Globe, Save, Loader2 } from 'lucide-react'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/admin/settings')({
  component: Settings,
})

function Settings() {
  const queryClient = useQueryClient()
  const { data: session } = useQuery({
    queryKey: ['admin-session'],
    queryFn: async () => {
      const { data } = await supabase.auth.getSession()
      return data.session
    }
  })

  const [email, setEmail] = useState('')

  useEffect(() => {
    if (session?.user?.email) {
      setEmail(session.user.email)
    }
  }, [session])

  const updateEmailMutation = useMutation({
    mutationFn: async (newEmail: string) => {
      const { error } = await supabase.auth.updateUser({ email: newEmail })
      if (error) throw error
    },
    onSuccess: () => toast.success('E-mail atualizado (verifique sua caixa de entrada).'),
    onError: (err) => toast.error(`Erro: ${err.message}`)
  })

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-3xl font-serif text-[#24170F]">Configurações</h2>
        <p className="text-muted-foreground font-sans">Ajustes da conta e do painel</p>
      </div>

      <div className="grid gap-8">
        <Card className="p-6 border-none shadow-sm bg-white">
          <div className="flex items-center gap-3 mb-6 border-b pb-4">
            <Lock className="w-5 h-5 text-gold" />
            <h3 className="text-lg font-serif text-[#24170F]">Segurança e Acesso</h3>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">E-mail Administrativo</label>
              <div className="flex gap-2">
                <Input value={email} onChange={e => setEmail(e.target.value)} className="max-w-md" />
                <Button 
                  onClick={() => updateEmailMutation.mutate(email)} 
                  disabled={updateEmailMutation.isPending}
                  className="bg-gold text-white"
                >
                  {updateEmailMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Atualizar'}
                </Button>
              </div>
            </div>

            <div className="pt-4 border-t border-beige/10">
              <Button variant="outline" className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-100">
                Alterar Senha
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-none shadow-sm bg-white">
          <div className="flex items-center gap-3 mb-6 border-b pb-4">
            <Bell className="w-5 h-5 text-gold" />
            <h3 className="text-lg font-serif text-[#24170F]">Notificações</h3>
          </div>
          
          <div className="space-y-4">
            {[
              { label: 'Novos cliques no Airbnb', desc: 'Receber aviso quando alguém clicar para reservar.' },
              { label: 'Lembretes de limpeza', desc: 'Notificar 24h antes do check-in.' },
              { label: 'Relatório semanal', desc: 'Resumo de acessos e conversão por e-mail.' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-[#24170F]">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Switch />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
