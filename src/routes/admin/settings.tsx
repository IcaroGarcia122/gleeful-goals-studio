import { createFileRoute } from '@tanstack/react-router'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Save, User, Bell, Link2, Shield } from 'lucide-react'

export const Route = createFileRoute('/admin/settings')({
  component: SettingsPage,
})

function SettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-3xl font-serif text-[#24170F]">Configurações</h2>
        <p className="text-muted-foreground font-sans">Ajustes gerais do sistema e perfil</p>
      </div>

      <div className="space-y-6">
        <Card className="p-6 border-none shadow-sm bg-white space-y-6">
          <div className="flex items-center gap-2 text-[#C59A55] font-serif border-b pb-2">
            <User className="w-5 h-5" />
            <h3>Perfil do Anfitrião</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Nome de Exibição</label>
              <Input defaultValue="Anfitrião Chalé" />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">E-mail de Contato</label>
              <Input defaultValue="contato@chale.com" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-none shadow-sm bg-white space-y-6">
          <div className="flex items-center gap-2 text-[#C59A55] font-serif border-b pb-2">
            <Shield className="w-5 h-5" />
            <h3>Segurança</h3>
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Nova Senha</label>
            <Input type="password" placeholder="Deixe em branco para não alterar" />
          </div>
        </Card>

        <Card className="p-6 border-none shadow-sm bg-white space-y-6">
          <div className="flex items-center gap-2 text-[#C59A55] font-serif border-b pb-2">
            <Bell className="w-5 h-5" />
            <h3>Notificações</h3>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Alertas de Cliques Airbnb</span>
            <div className="w-10 h-5 bg-gold rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" /></div>
          </div>
        </Card>

        <Button className="w-full bg-gold hover:bg-gold/90 text-white font-bold tracking-widest text-xs py-6">
          <Save className="w-4 h-4 mr-2" /> SALVAR CONFIGURAÇÕES
        </Button>
      </div>
    </div>
  )
}