import { createFileRoute } from '@tanstack/react-router'
import { Card } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { Loader2 } from 'lucide-react'

export const Route = createFileRoute('/admin/recommendations')({
  component: RecommendationsPage,
})

function RecommendationsPage() {
  const { data: recs, isLoading } = useQuery({
    queryKey: ['recommendations'],
    queryFn: async () => {
      const { data, error } = await supabase.from('local_recommendations').select('*')
      if (error) throw error
      return data
    }
  })

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-3xl font-serif text-[#24170F]">Guia da Região</h2>
        <p className="text-muted-foreground font-sans">Gerencie recomendações locais</p>
      </div>

      {isLoading ? <Loader2 className="animate-spin text-gold mx-auto" /> :
        recs?.map(r => (
          <Card key={r.id} className="p-4">
            <h4 className="font-semibold text-lg">{r.name}</h4>
            <p className="text-sm text-muted-foreground">{r.category} • {r.address}</p>
          </Card>
        ))
      }
    </div>
  )
}
