import { createFileRoute } from '@tanstack/react-router'
import { Card } from '@/components/ui/card'
import { ImagePlus, Trash2, GripVertical, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/admin/gallery')({
  component: GalleryManagement,
})

function GalleryManagement() {
  const images = [
    { id: 1, url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233', main: true },
    { id: 2, url: 'https://images.unsplash.com/photo-1449156006071-872f057864f7', main: false },
    { id: 3, url: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e', main: false },
    { id: 4, url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470', main: false },
  ]

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-serif text-[#24170F]">Galeria</h2>
          <p className="text-sm md:text-base text-muted-foreground font-sans">Gerencie as fotos do site</p>
        </div>
        <Button className="w-full sm:w-auto bg-[#24170F] text-white hover:bg-[#17130F]">
          <ImagePlus className="w-4 h-4 mr-2" /> Upload
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img) => (
          <Card key={img.id} className="group relative overflow-hidden border-none shadow-sm aspect-video">
            <img src={img.url} alt="" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button size="icon" variant="secondary" className="h-8 w-8">
                <Star className={`h-4 w-4 ${img.main ? 'fill-yellow-400 text-yellow-400' : ''}`} />
              </Button>
              <Button size="icon" variant="secondary" className="h-8 w-8">
                <GripVertical className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="destructive" className="h-8 w-8">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            {img.main && (
              <div className="absolute top-2 left-2 bg-gold text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase">
                Principal
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}