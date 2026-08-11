import { createFileRoute } from '@tanstack/react-router'
import { LayoutDashboard, Users, Info, Image, BarChart3, Settings, LogOut, CheckSquare, Menu, X } from 'lucide-react'
import { Link, Outlet } from '@tanstack/react-router'
import { supabase } from '@/integrations/supabase/client'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export const Route = createFileRoute('/admin')({
  component: AdminLayout,
})

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, to: '/admin/dashboard' },
    { label: 'Reservas', icon: Users, to: '/admin/reservations' },
    { label: 'Hóspedes', icon: Users, to: '/admin/guests' },
    { label: 'Informações', icon: Info, to: '/admin/content' },
    { label: 'Galeria', icon: Image, to: '/admin/gallery' },
    { label: 'Analytics', icon: BarChart3, to: '/admin/analytics' },
    { label: 'Organização', icon: CheckSquare, to: '/admin/tasks' },
    { label: 'Configurações', icon: Settings, to: '/admin/settings' },
  ]

  const closeSidebar = () => setIsSidebarOpen(false)

  return (
    <div className="flex h-screen bg-[#F7F3EA] overflow-hidden">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#24170F] flex items-center justify-between px-4 z-50">
        <h1 className="text-lg font-serif text-[#C59A55]">CHALÉ ADMIN</h1>
        <Button variant="ghost" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white hover:bg-white/10">
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 w-64 bg-[#24170F] text-[#FFFDF8] flex flex-col z-50 transform transition-transform duration-300 lg:translate-x-0 lg:static
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-8 hidden lg:block">
          <h1 className="text-xl font-serif tracking-tight text-[#C59A55]">CHALÉ ADMIN</h1>
        </div>
        
        <nav className="flex-1 px-4 pt-20 lg:pt-0 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={closeSidebar}
              activeProps={{ className: 'bg-[#C59A55] text-white opacity-100' }}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-sans opacity-70 hover:opacity-100 transition-all"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
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
      <main className="flex-1 overflow-y-auto pt-16 lg:pt-0 p-4 md:p-8">
        <div className="max-w-7xl mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  )
}