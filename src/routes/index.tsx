import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getSiteContent } from "@/lib/cms.functions";
import heroAsset from "@/assets/hero-chale.png.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data: content } = useQuery({
    queryKey: ["site-content"],
    queryFn: () => getSiteContent(),
  });

  if (!content) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-warm-white">
        <img
          src={heroAsset.url}
          alt="Chalé A-frame"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-soft-black/50" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <span className="text-sm uppercase tracking-widest text-gold mb-4 block font-serif italic">
            {content.hero_subtitle}
          </span>
          <h1 className="text-5xl md:text-7xl font-serif leading-tight mb-6">
            {content.hero_title.split("\n").map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h1>
          <p className="text-lg md:text-xl font-sans mb-10 max-w-2xl mx-auto">
            {content.hero_description}
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href={content.airbnb_url}
              className="bg-gold text-white px-8 py-4 rounded-sm font-sans hover:bg-gold/90 transition-colors"
            >
              RESERVE NO AIRBNB
            </a>
            <a
              href="#sobre"
              className="border border-gold text-white px-8 py-4 rounded-sm font-sans hover:bg-white/10 transition-colors"
            >
              CONHEÇA O CHALÉ ↓
            </a>
          </div>
        </div>
      </section>

      {/* Sobre o Chalé */}
      <section id="sobre" className="py-24 px-4 bg-background">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-dark-brown mb-8">
              {content.about_title.split("\n").map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h2>
            <p className="text-lg text-muted-foreground font-sans mb-6">
              {content.about_text_1}
            </p>
            <p className="text-lg text-muted-foreground font-sans">
              {content.about_text_2}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square bg-beige rounded-sm" />
            <div className="aspect-square bg-wood rounded-sm" />
          </div>
        </div>
      </section>
    </div>
  );
}
