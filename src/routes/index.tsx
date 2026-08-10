import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { getSiteContent } from "@/lib/cms.functions";
import { 
  Waves, 
  Mountain, 
  UtensilsCrossed, 
  Wifi, 
  Car, 
  Bath, 
  Tv, 
  Snowflake,
  Home,
  BedDouble,
  DoorOpen,
  Maximize2,
  Palmtree,
  Users
} from "lucide-react";
import heroAsset from "@/assets/hero-chale.png.asset.json";
import banheiraAsset from "@/assets/banheira.png.asset.json";
import salaAsset from "@/assets/sala.png.asset.json";
import cozinhaAsset from "@/assets/cozinha.png.asset.json";
import interiorAsset from "@/assets/chalet-view-interior.png.asset.json";
import img12Asset from "@/assets/image-12.png.asset.json";
import img13Asset from "@/assets/image-13.png.asset.json";
import img14Asset from "@/assets/image-14.png.asset.json";
import quartoAsset from "@/assets/quarto.png.asset.json";
import img15Asset from "@/assets/image-15.png.asset.json";

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
      {/* Header Removido conforme solicitação */}


      {/* Hero Section */}
      <section className="relative h-[100vh] z-0">
        <div className="fixed inset-0 w-full h-screen pointer-events-none">
          <img
            src={heroAsset.url}
            alt="Chalé A-frame"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-soft-black/40" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto pointer-events-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
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
              className="text-5xl md:text-8xl font-serif leading-[1.1] mb-8 tracking-tight text-white"
            >
              Conecte-se com<br />o que realmente<br />
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.8 }}
                style={{ fontFamily: "'Alex Brush', cursive" }}
                className="bg-gradient-to-br from-[#C59A55] via-[#E6C994] to-[#A67C37] bg-clip-text text-transparent block mt-4 text-6xl md:text-9xl font-normal drop-shadow-sm"
              >
                importa.
              </motion.span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-sm md:text-base font-sans mb-12 max-w-xl mx-auto opacity-90 font-light leading-relaxed text-white"
            >
              Chalé privativo com vista para o mar, banheira interna e deck exclusivo para momentos inesquecíveis.
            </motion.p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <motion.a
                href={content.airbnb_url}
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(197, 154, 85, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gold text-white px-10 py-5 rounded-full font-sans font-bold tracking-widest hover:bg-gold/90 transition-all shadow-[0_10px_30px_rgba(197, 154, 85, 0.3)] ring-2 ring-gold/20"
              >
                RESERVE NO AIRBNB
              </motion.a>
              <a
                href="#sobre"
                className="border border-gold text-white px-8 py-4 rounded-sm font-sans hover:bg-white/10 transition-colors"
              >
                CONHEÇA O CHALÉ ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre o Chalé */}
      <section id="sobre" className="relative py-24 bg-background z-20 shadow-[0_-20px_80px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 md:order-1"
            >
              <h2 className="text-4xl md:text-6xl font-serif text-dark-brown mb-8 leading-tight">
                {content.about_title.split("\n").map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </h2>
              <div className="space-y-6 max-w-md">
                <p className="text-lg text-muted-foreground font-sans leading-relaxed">
                  {content.about_text_1}
                </p>
                <p className="text-lg text-muted-foreground font-sans leading-relaxed">
                  {content.about_text_2}
                </p>
                <div className="pt-8">
                  <a
                    href={content.airbnb_url}
                    className="inline-flex items-center gap-2 text-gold font-sans font-bold uppercase tracking-widest hover:gap-4 transition-all"
                  >
                    Ver disponibilidade <span className="text-xl">→</span>
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="order-1 md:order-2 grid grid-cols-2 gap-4"
            >
              <div className="col-span-2 aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
                <img src={img14Asset.url} alt="Vista principal" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                <img src={img12Asset.url} alt="Sala de estar" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                <img src={img13Asset.url} alt="Cozinha e escada" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Galeria / Destaques (Estilo Polaroid) */}
      <section className="relative py-20 px-4 bg-[#24170F] text-[#FFFDF8] overflow-hidden z-20">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] filter contrast-150" />
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/20 to-transparent" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-4 tracking-tight italic">Destaques do Chalé</h2>
            <div className="w-16 h-0.5 bg-[#C59A55] mx-auto opacity-60" />
          </motion.div>
          
          <div className="relative h-[550px] w-full max-w-4xl mx-auto">
            {[
              { img: quartoAsset, title: "Suíte Aconchegante", x: "-30%", y: "-20%", rotate: -8 },
              { img: cozinhaAsset, title: "Design Moderno", x: "35%", y: "25%", rotate: 12 },
              { img: banheiraAsset, title: "Relaxe na Hidro", x: "-25%", y: "30%", rotate: -5 },
              { img: heroAsset, title: "Vista Privilegiada", x: "30%", y: "-25%", rotate: 6 },
              { img: img14Asset, title: "Paz & Natureza", x: "0%", y: "0%", rotate: 0, priority: true },
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ 
                  opacity: 1, 
                  scale: item.priority ? 1.05 : 0.85, 
                  left: `calc(50% + ${item.x})`,
                  top: `calc(50% + ${item.y})`,
                  rotate: item.rotate 
                }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 50 }}
                whileHover={{ 
                  scale: 1.1, 
                  rotate: 0, 
                  zIndex: 50,
                  transition: { duration: 0.3 }
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 bg-white p-1.5 pb-6 shadow-2xl cursor-pointer w-40 md:w-48 group border-[0.5px] border-black/5"
              >
                <div className="aspect-[4/5] overflow-hidden mb-2">
                  <img 
                    src={item.img.url} 
                    alt={item.title} 
                    className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500" 
                  />
                </div>
                <p className="text-dark-brown font-script text-xl text-center leading-none">
                  {item.title}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Avaliações */}
      <section className="relative py-24 px-4 bg-warm-white z-20">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 text-gold mb-4">
            <span className="text-2xl font-serif">5,0 / 5</span>
            <div className="flex gap-1">{"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}</div>
          </div>
          <h2 className="text-4xl font-serif text-dark-brown mb-2">Preferido dos hóspedes</h2>
          <p className="text-sm uppercase tracking-widest text-muted-foreground">100% das avaliações são 5 estrelas</p>
        </div>
        
        <div className="max-w-7xl mx-auto overflow-hidden">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ 
              repeat: Infinity, 
              duration: 40, 
              ease: "linear" 
            }}
            className="flex gap-8 whitespace-nowrap"
          >
            {[...Array(6)].map((_, idx) => (
              [
                { author: "Alice", text: "Tudo simplesmente maravilhoso! O chalé é incrível.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&auto=format&fit=crop" },
                { author: "Bruna", text: "Decoração de muito bom gosto, ótima climatização, vista perfeita.", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&auto=format&fit=crop" },
                { author: "Higor", text: "Superou as expectativas. A vista para o mar é incrível.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&auto=format&fit=crop" },
                { author: "Gerusa", text: "Buscando tranquilidade e super correspondeu. Cabana cheirosa.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&auto=format&fit=crop" }
              ].map((rev, i) => (
                <div key={`${idx}-${i}`} className="min-w-[300px] bg-white p-6 rounded-lg shadow-sm border border-beige/20 flex flex-col justify-between">
                  <p className="text-sm font-serif italic text-dark-brown/80 mb-4 whitespace-normal">
                    "{rev.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img src={rev.avatar} alt={rev.author} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className="text-xs font-bold text-dark-brown">{rev.author}</p>
                      <div className="flex text-[8px] text-gold">★★★★★</div>
                    </div>
                  </div>
                </div>
              ))
            ))}
          </motion.div>
        </div>
      </section>

      {/* Detalhes do Imóvel (Airbnb Info) */}
      <section className="relative py-24 px-4 bg-background z-20">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-dark-brown mb-4">Tudo para você simplesmente aproveitar.</h2>
            <div className="w-16 h-0.5 bg-gold mx-auto opacity-60" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h3 className="text-2xl font-serif text-dark-brown border-b border-beige/30 pb-4">O Espaço</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Imóvel privativo", icon: Home },
                  { label: "2 Quartos (1 Suíte)", icon: BedDouble },
                  { label: "Dois banheiros", icon: DoorOpen },
                  { label: "Vista para o mar", icon: Waves },
                  { label: "Banheira interna", icon: Bath },
                  { label: "Deck externo amplo", icon: Maximize2 },
                  { label: "Balanço suspenso", icon: Palmtree },
                  { label: "Ambientes integrados", icon: Home },
                  { label: "Arquitetura em madeira", icon: Home },
                  { label: "Cercado por natureza", icon: Palmtree },
                  { label: "Ideal para famílias", icon: Users }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground font-sans">
                    <item.icon className="w-4 h-4 text-gold/70" />
                    {item.label}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h3 className="text-2xl font-serif text-dark-brown border-b border-beige/30 pb-4">Comodidades</h3>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: "Vista para o mar", icon: Waves },
                  { label: "Montanhas", icon: Mountain },
                  { label: "Cozinha completa", icon: UtensilsCrossed },
                  { label: "Wi-Fi rápido", icon: Wifi },
                  { label: "Estacionamento", icon: Car },
                  { label: "Hidromassagem", icon: Bath },
                  { label: "Smart TV", icon: Tv },
                  { label: "Ar-condicionado", icon: Snowflake }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-white/50 rounded-xl border border-beige/10 hover:border-gold/30 transition-colors group">
                    <item.icon className="w-6 h-6 text-gold group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-sans text-muted-foreground font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          
          <div className="mt-20 rounded-2xl overflow-hidden shadow-2xl aspect-[21/9] block md:hidden">
            <img src={img15Asset.url} alt="Vista Panorâmica" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative py-24 px-4 flex flex-col items-center justify-center text-center text-warm-white z-20">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src={heroAsset.url}
            alt="Chalé ao pôr do sol"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-soft-black/70" />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-2xl px-4"
        >
          <h2 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">
            Viva momentos únicos neste paraíso em <span className="italic text-gold">Florianópolis.</span>
          </h2>
          <p className="text-base font-sans mb-8 opacity-80 max-w-lg mx-auto font-light leading-relaxed">
            Garanta sua data e aproveite uma experiência exclusiva em meio à natureza.
          </p>
          <motion.a
            href={content.airbnb_url}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-gold text-white px-8 py-4 rounded-full font-sans font-bold tracking-widest text-sm hover:bg-gold/90 transition-all shadow-xl"
          >
            RESERVE AGORA
          </motion.a>
        </motion.div>
      </section>
      
      {/* Botão Fixo Mobile Removido */}


      {/* Footer */}
      <footer className="relative bg-dark-brown pt-20 pb-12 px-4 text-warm-white z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-serif mb-6">CHALÉ A-FRAME</h3>
            <p className="text-sm opacity-60 font-light leading-relaxed max-w-xs mx-auto md:mx-0">
              Uma experiência boutique em Florianópolis, conectando você com a natureza e o mar em um refúgio exclusivo.
            </p>
          </div>
          
          <div className="text-center">
            <h4 className="text-xs uppercase tracking-[0.2em] opacity-40 mb-6">Explorar</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><a href="#sobre" className="hover:text-gold transition-colors">O Chalé</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Galeria</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Localização</a></li>
              <li><a href={content.airbnb_url} className="hover:text-gold transition-colors">Reservar</a></li>
            </ul>
          </div>

          <div className="text-center md:text-right">
            <h4 className="text-xs uppercase tracking-[0.2em] opacity-40 mb-6">Contato</h4>
            <p className="text-sm font-light mb-2">Florianópolis, SC - Brasil</p>
            <p className="text-sm font-light opacity-60">Próximo ao Villa Casarão</p>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 text-center">
          <p className="text-[10px] uppercase tracking-widest opacity-30">
            &copy; {new Date().getFullYear()} Chalé A-Frame Florianópolis. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
