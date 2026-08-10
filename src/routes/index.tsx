import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getSiteContent } from "@/lib/cms.functions";
import heroAsset from "@/assets/hero-chale.png.asset.json";
import banheiraAsset from "@/assets/banheira.png.asset.json";
import salaAsset from "@/assets/sala.png.asset.json";
import cozinhaAsset from "@/assets/cozinha.png.asset.json";

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
            <img src={banheiraAsset.url} alt="Banheira" className="aspect-square object-cover rounded-sm" />
            <img src={salaAsset.url} alt="Sala" className="aspect-square object-cover rounded-sm" />
          </div>
        </div>
      </section>
      {/* Galeria / Destaques */}
      <section className="py-24 px-4 bg-dark-brown text-warm-white">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">DESTAQUES DO CHALÉ</h2>
          <div className="w-24 h-px bg-gold mx-auto opacity-50" />
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
            { img: salaAsset, title: "Pôr do sol incrível" },
            { img: cozinhaAsset, title: "Ambientes integrados" },
            { img: banheiraAsset, title: "Banheira para relaxar" },
            { img: heroAsset, title: "Conforto e privacidade" },
            { img: salaAsset, title: "Deck com balanço" },
          ].map((item, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-[3/4] overflow-hidden rounded-sm mb-4">
                <img 
                  src={item.img.url} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <p className="text-sm text-center font-sans tracking-wide opacity-80 uppercase">{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Localização */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-serif text-dark-brown mb-8 leading-tight">
              Entre a natureza,<br />o mar e a tranquilidade.
            </h2>
            <p className="text-lg text-muted-foreground font-sans mb-8">
              O chalé está localizado em Florianópolis, em uma região tranquila e cercada pela natureza, próximo ao Villa Casarão.
            </p>
          </div>
          <div className="flex-1 w-full aspect-video rounded-sm overflow-hidden shadow-2xl">
            <img src={heroAsset.url} alt="Vista do Chalé" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative py-32 px-4 flex flex-col items-center justify-center text-center text-warm-white">
        <img
          src={heroAsset.url}
          alt="Chalé ao pôr do sol"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-soft-black/60" />
        <div className="relative z-10 max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
            Viva momentos únicos neste paraíso em Florianópolis.
          </h2>
          <p className="text-lg md:text-xl font-sans mb-10 opacity-90">
            Garanta sua data e aproveite uma experiência exclusiva em meio à natureza.
          </p>
          <a
            href={content.airbnb_url}
            className="bg-gold text-white px-10 py-5 rounded-sm font-sans text-lg hover:bg-gold/90 transition-all shadow-xl hover:-translate-y-1"
          >
            RESERVE AGORA NO AIRBNB
          </a>
        </div>
      </section>
      
      {/* Botão Fixo Mobile */}
      <div className="md:hidden fixed bottom-6 left-4 right-4 z-50">
        <a
          href={content.airbnb_url}
          className="block w-full bg-gold text-white text-center py-4 rounded-sm font-sans font-bold shadow-2xl"
        >
          RESERVAR NO AIRBNB
        </a>
      </div>
    </div>
  );
}
