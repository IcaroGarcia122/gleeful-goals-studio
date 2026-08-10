import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
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
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Header Discreto */}
      <header className="absolute top-0 left-0 right-0 z-20 p-6 flex justify-between items-center text-warm-white">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex gap-6 text-xs uppercase tracking-widest font-sans hidden md:flex"
        >
          <span>Vista para o mar</span>
          <span>Banheira interna</span>
          <span>Deck exclusivo</span>
          <span>Natureza e privacidade</span>
        </motion.div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-warm-white overflow-hidden">
        <motion.div 
          style={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={heroAsset.url}
            alt="Chalé A-frame"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-soft-black/40" />
        </motion.div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-block border border-warm-white/30 px-4 py-1 mb-8"
          >
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-warm-white font-sans font-light">
              CHALÉ EXCLUSIVO EM FLORIANÓPOLIS - SC
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-8xl font-serif leading-[1.1] mb-8 tracking-tight"
          >
            Conecte-se com<br />o que realmente<br />
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 }}
              style={{ fontFamily: 'var(--font-script)' }}
              className="text-gold block mt-2 text-6xl md:text-9xl"
            >
              importa.
            </motion.span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-sm md:text-base font-sans mb-12 max-w-xl mx-auto opacity-90 font-light leading-relaxed"
          >
            Chalé privativo com vista para o mar, banheira interna e deck exclusivo para momentos inesquecíveis.
          </motion.p>
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
      <section id="sobre" className="py-24 px-4 bg-background overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
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
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            <img src={banheiraAsset.url} alt="Banheira" className="aspect-square object-cover rounded-sm shadow-xl hover:scale-105 transition-transform duration-500" />
            <img src={salaAsset.url} alt="Sala" className="aspect-square object-cover rounded-sm shadow-xl hover:scale-105 transition-transform duration-500" />
          </motion.div>
        </div>
      </section>
      {/* Galeria / Destaques (Estilo Polaroid) */}
      <section className="py-24 px-4 bg-dark-brown text-warm-white overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-4 uppercase tracking-widest">DESTAQUES DO CHALÉ</h2>
          <div className="w-24 h-px bg-gold mx-auto opacity-50" />
        </motion.div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 px-8">
          {[
            { img: salaAsset, title: "Pôr do sol incrível", rotate: -3 },
            { img: cozinhaAsset, title: "Ambientes integrados", rotate: 2 },
            { img: banheiraAsset, title: "Banheira para relaxar", rotate: -2 },
            { img: heroAsset, title: "Conforto e privacidade", rotate: 3 },
            { img: salaAsset, title: "Deck com balanço", rotate: -1 },
          ].map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 50, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: item.rotate }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ 
                scale: 1.05, 
                rotate: 0, 
                zIndex: 10,
                transition: { duration: 0.3 }
              }}
              className="bg-white p-4 pb-12 shadow-2xl cursor-pointer group"
            >
              <div className="aspect-[4/5] overflow-hidden mb-6">
                <motion.img 
                  src={item.img.url} 
                  alt={item.title} 
                  className="w-full h-full object-cover filter sepia-[0.1] grayscale-[0.1] group-hover:grayscale-0 group-hover:sepia-0 transition-all duration-500" 
                />
              </div>
              <p className="text-dark-brown font-script text-2xl text-center leading-none tracking-tight">
                {item.title}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Avaliações */}
      <section className="py-24 px-4 bg-warm-white">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 text-gold mb-4">
            <span className="text-2xl font-serif">5,0 / 5</span>
            <div className="flex gap-1">{"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}</div>
          </div>
          <h2 className="text-4xl font-serif text-dark-brown mb-2">Preferido dos hóspedes</h2>
          <p className="text-sm uppercase tracking-widest text-muted-foreground">100% das avaliações são 5 estrelas</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 md:p-12 rounded-sm shadow-sm border border-beige/30 relative">
            <p className="text-xl md:text-2xl font-serif italic text-dark-brown text-center mb-8">
              "Tudo simplesmente maravilhoso! O chalé é incrível, tudo muito limpo e bem feito. Estava nublado e mesmo assim o local é lindo demais. Super indico."
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-beige" />
              <div>
                <p className="font-sans font-bold text-dark-brown">Alice</p>
                <div className="flex text-xs text-gold">★★★★★</div>
              </div>
            </div>
          </div>
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
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-4xl px-4"
        >
          <h2 className="text-4xl md:text-7xl font-serif mb-8 leading-tight">
            Viva momentos únicos neste paraíso em <span className="italic text-gold">Florianópolis.</span>
          </h2>
          <p className="text-lg md:text-xl font-sans mb-12 opacity-90 max-w-2xl mx-auto font-light">
            Garanta sua data e aproveite uma experiência exclusiva em meio à natureza.
          </p>
          <motion.a
            href={content.airbnb_url}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-gold text-white px-12 py-5 rounded-sm font-sans text-lg hover:bg-gold/90 transition-all shadow-2xl"
          >
            RESERVE AGORA NO AIRBNB
          </motion.a>
        </motion.div>
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
      {/* Footer minimalista */}
      <footer className="bg-dark-brown py-12 px-4 text-warm-white/40 text-center text-xs uppercase tracking-widest font-sans">
        <p>&copy; {new Date().getFullYear()} Chalé A-Frame Florianópolis. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
