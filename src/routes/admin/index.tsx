import { createFileRoute } from '@tanstack/react-router'
import { LayoutDashboard, Calendar, Users, Info, Image, BarChart3, Settings, LogOut, CheckSquare } from 'lucide-react'
import { Link, Outlet } from '@tanstack/react-router'
import { supabase } from '@/integrations/supabase/client'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/admin/')({
  component: AdminLayout,
})

function AdminLayout() {
  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, to: '/admin' },
    { label: 'Calendário', icon: Calendar, to: '/admin/calendar' },
    { label: 'Reservas', icon: Users, to: '/admin/reservations' },
    { label: 'Hóspedes', icon: Users, to: '/admin/guests' },
    { label: 'Informações', icon: Info, to: '/admin/content' },
    { label: 'Galeria', icon: Image, to: '/admin/gallery' },
    { label: 'Analytics', icon: BarChart3, to: '/admin/analytics' },
    { label: 'Organização', icon: CheckSquare, to: '/admin/tasks' },
    { label: 'Configurações', icon: Settings, to: '/admin/settings' },
  ]

  return (
    <div className="flex h-screen bg-[#F7F3EA]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#24170F] text-[#FFFDF8] flex flex-col">
        <div className="p-8">
          <h1 className="text-xl font-serif tracking-tight text-[#C59A55]">CHALÉ ADMIN</h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              activeProps={{ className: 'bg-[#C59A55] text-white opacity-100' }}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-sans opacity-70 hover:opacity-100 transition-all"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-white/10">
          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="w-full flex items-center justify-start gap-3 text-red-400 hover:text-red-300 hover:bg-white/5 font-normal"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  )
}
