import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getSiteContent, updateSiteContent } from '@/lib/cms.functions'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Save, Loader2 } from 'lucide-react'

export const Route = createFileRoute('/admin/content')({
  component: ContentManagement,
})

function ContentManagement() {
  const queryClient = useQueryClient()
  const { data: content, isLoading } = useQuery({
    queryKey: ['site-content'],
    queryFn: () => getSiteContent(),
  })

  const [formData, setFormData] = useState<any>(null)

  // Initialize form data when content is loaded
  if (content && !formData && !isLoading) {
    setFormData(content)
  }

  const updateMutation = useMutation({
    mutationFn: (data: any) => updateSiteContent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-content'] })
      toast.success('Conteúdo atualizado com sucesso!')
    },
    onError: () => {
      toast.error('Erro ao atualizar conteúdo.')
    }
  })

  if (isLoading || !formData) return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-gold" /></div>

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateMutation.mutate(formData)
  }

  return (
    <div className="space-y-6 md:space-y-8 max-w-4xl">
      <div>
        <h2 className="text-2xl md:text-3xl font-serif text-[#24170F]">Conteúdo</h2>
        <p className="text-sm md:text-base text-muted-foreground font-sans">Edite as informações da landing page</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6 space-y-6 border-none shadow-sm">
          <div className="grid gap-4">
            <h3 className="text-lg font-serif border-b pb-2">Hero Section</h3>
            <div className="space-y-2">
              <label className="text-sm font-medium">Título Principal</label>
              <Input name="hero_title" value={formData.hero_title} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Descrição</label>
              <Textarea name="hero_description" value={formData.hero_description} onChange={handleChange} />
            </div>
          </div>

          <div className="grid gap-4">
            <h3 className="text-lg font-serif border-b pb-2">Seção Sobre</h3>
            <div className="space-y-2">
              <label className="text-sm font-medium">Título</label>
              <Input name="about_title" value={formData.about_title} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Texto 1</label>
              <Textarea name="about_text_1" value={formData.about_text_1} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Texto 2</label>
              <Textarea name="about_text_2" value={formData.about_text_2} onChange={handleChange} />
            </div>
          </div>

          <div className="grid gap-4">
            <h3 className="text-lg font-serif border-b pb-2">Configurações Externas</h3>
            <div className="space-y-2">
              <label className="text-sm font-medium">Link do Airbnb</label>
              <Input name="airbnb_url" value={formData.airbnb_url} onChange={handleChange} />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={updateMutation.isPending}
            className="w-full bg-gold hover:bg-gold/90 text-white"
          >
            {updateMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Salvar Alterações
          </Button>
        </Card>
      </form>
    </div>
  )
}
