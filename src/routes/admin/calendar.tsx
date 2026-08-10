import { createFileRoute } from '@tanstack/react-router'
import { Card } from '@/components/ui/card'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { useState } from 'react'
import { ptBR } from 'date-fns/locale'

export const Route = createFileRoute('/admin/calendar')({
  component: AdminCalendar,
})

function AdminCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-serif text-[#24170F]">Calendário</h2>
        <p className="text-muted-foreground font-sans">Gerencie datas disponíveis e bloqueadas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 p-6 border-none shadow-sm bg-white">
          <CalendarComponent
            mode="single"
            selected={date}
            onSelect={setDate}
            locale={ptBR}
            className="w-full flex justify-center"
            classNames={{
              months: "w-full space-y-4",
              month: "w-full space-y-4",
              table: "w-full border-collapse space-y-1",
              head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
              cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 w-full h-12",
              day: "h-12 w-full p-0 font-normal aria-selected:opacity-100 hover:bg-[#F7F3EA] rounded-lg transition-colors",
              day_selected: "bg-gold text-white hover:bg-gold/90 hover:text-white focus:bg-gold focus:text-white",
            }}
          />
        </Card>

        <Card className="p-6 border-none shadow-sm bg-white space-y-6">
          <h3 className="text-lg font-serif text-[#24170F]">Legenda</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded bg-gold" />
              <span className="text-sm font-sans text-muted-foreground">Data Selecionada</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded bg-green-100 border border-green-200" />
              <span className="text-sm font-sans text-muted-foreground">Check-in (Airbnb)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded bg-red-100 border border-red-200" />
              <span className="text-sm font-sans text-muted-foreground">Data Bloqueada</span>
            </div>
          </div>
          
          <div className="pt-6 border-t border-beige/10">
            <p className="text-xs text-muted-foreground italic leading-relaxed">
              * O calendário é gerenciado manualmente. As reservas do Airbnb devem ser bloqueadas aqui para evitar conflitos.
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
