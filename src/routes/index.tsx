import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { getSiteContent, trackAirbnbClick } from "@/lib/cms.functions";
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
  Users,
  MessageCircle,
  Smartphone,
  Info,
  Compass,
  Sparkles,
  Heart,
  Calendar,
  Star,
  ArrowRight
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
  head: () => ({
    meta: [
      { title: "Chalé A-Frame em Florianópolis | Refúgio com Vista para o Mar" },
      {
        name: "description",
        content:
          "Chalé A-frame privativo em Florianópolis: vista para o mar, banheira interna, deck exclusivo e natureza. Hospedagem boutique 5 estrelas.",
      },
      { property: "og:title", content: "Chalé A-Frame em Florianópolis | Vista para o Mar" },
      {
        property: "og:description",
        content:
          "Refúgio boutique entre a natureza e o mar. Banheira interna, deck exclusivo e privacidade absoluta em Florianópolis.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});


function Index() {
  const { data: content } = useQuery({
    queryKey: ["site-content"],
    queryFn: () => getSiteContent(),
  });

  const trackClick = useMutation({
    mutationFn: (data: { source: string }) => trackAirbnbClick({ data })
  });

  if (!content) return null;

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Header Removido conforme solicitação */}


      {/* Hero Section */}
      <section className="relative h-[100vh] z-0">
        <div className="fixed inset-0 w-full h-screen pointer-events-none overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://imgur.com/J34nkMe.mp4" type="video/mp4" />
          </video>
          {/* Camadas cinematográficas: escurecimento e vinheta */}
          <div className="absolute inset-0 bg-gradient-to-b from-soft-black/70 via-soft-black/35 to-soft-black/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(23,19,15,0.65)_100%)]" />
          <div className="absolute inset-0 grain" />

          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto pointer-events-auto">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="inline-flex items-center gap-4 mb-10"
            >
              <span className="hidden md:block w-10 rule-gold" />
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.45em] text-warm-white/85 font-sans font-light">
                Chalé exclusivo em Florianópolis
              </span>
              <span className="hidden md:block w-10 rule-gold" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-5xl md:text-8xl font-serif font-light leading-[1.05] mb-8 tracking-tight text-warm-white [text-shadow:0_2px_30px_rgba(0,0,0,0.35)]"
            >
              Conecte-se com<br />o que realmente<br />
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.8 }}
                style={{ fontFamily: "'Alex Brush', cursive" }}
                className="bg-gradient-to-br from-[#E6C994] via-[#C59A55] to-[#A67C37] bg-clip-text text-transparent block mt-3 text-6xl md:text-9xl font-normal drop-shadow-[0_4px_20px_rgba(0,0,0,0.35)]"
              >
                importa.
              </motion.span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-sm md:text-base font-sans mb-12 max-w-xl mx-auto text-warm-white/80 font-light leading-relaxed tracking-wide"
            >
              Chalé privativo com vista para o mar, banheira interna e deck exclusivo para momentos inesquecíveis.
            </motion.p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <motion.a
                href={content.airbnb_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackClick.mutate({ source: 'hero_main' })}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="group relative overflow-hidden bg-gold text-warm-white px-12 py-5 rounded-full font-sans font-semibold tracking-[0.25em] text-[11px] md:text-xs shadow-lux ring-1 ring-warm-white/20"
              >
                <span className="relative z-10">RESERVE NO AIRBNB</span>
                <span className="absolute inset-0 z-0 -translate-x-full bg-gradient-to-r from-transparent via-warm-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </motion.a>

              <motion.a
                href="#sobre"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="group relative px-10 py-5 overflow-hidden rounded-full border border-warm-white/25 text-warm-white font-sans text-[11px] md:text-xs tracking-[0.25em] transition-colors hover:border-gold"
              >
                <span className="relative z-10">CONHEÇA O CHALÉ ↓</span>
                <div className="absolute inset-0 bg-gold transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
              </motion.a>

            </div>

            <motion.div
              animate={{ y: [0, 10, 0], opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
            >
              <span className="text-[9px] uppercase tracking-[0.4em] text-warm-white/70">Role</span>
              <span className="w-px h-10 bg-gradient-to-b from-gold to-transparent" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* Sobre o Chalé - Versão Profissionalizada */}
      <section id="sobre" className="relative py-32 md:py-40 bg-[#FBF9F4] z-20 grain">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <div className="inline-flex items-center gap-4 text-gold mb-6">
                <div className="w-12 h-[1px] bg-gold" />
                <span className="text-xs uppercase tracking-[0.3em] font-bold">O Refúgio</span>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-serif font-light text-dark-brown mb-10 leading-[1.05] tracking-tight">
                {content.about_title.split("\n").map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </h2>
              
              <div className="space-y-8 mb-12">
                <p className="text-xl text-muted-foreground font-sans leading-relaxed font-light">
                  {content.about_text_1}
                </p>
                
                <div className="grid grid-cols-2 gap-8 border-y border-beige/30 py-10">
                  <div className="flex flex-col gap-2">
                    <span className="text-3xl font-serif text-dark-brown italic">2 Quartos</span>
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">Conforto absoluto</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-3xl font-serif text-dark-brown italic">Vista Mar</span>
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">Horizonte infinito</span>
                  </div>
                </div>

                <p className="text-lg text-muted-foreground/80 font-sans leading-relaxed">
                  {content.about_text_2}
                </p>
              </div>

              <motion.a
                href={content.airbnb_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackClick.mutate({ source: 'about_section' })}
                whileHover={{ gap: "2rem" }}
                className="inline-flex items-center gap-4 group w-full md:w-auto justify-center md:justify-start"
              >
                <div className="w-14 h-14 rounded-full border border-gold flex items-center justify-center transition-all group-hover:bg-gold shrink-0">
                  <ArrowRight className="w-6 h-6 text-gold group-hover:text-white transition-colors" />
                </div>
                <span className="text-gold font-sans font-bold uppercase tracking-[0.2em] text-sm text-center md:text-left">Ver disponibilidade completa</span>
              </motion.a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="lg:w-1/2 relative"
            >
              <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-lux ring-1 ring-beige/40 aspect-[4/5]">
                <img src={img14Asset.url} alt="Vista principal" className="w-full h-full object-cover" />
              </div>
              
              {/* Floating Element */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-12 -left-12 z-20 glass-warm p-6 rounded-2xl shadow-lux max-w-[240px] hidden md:block"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
                    <Star className="w-4 h-4 text-gold" />
                  </div>
                  <span className="text-sm font-serif font-bold text-dark-brown">Experiência 5 Estrelas</span>
                </div>
                <p className="text-[11px] text-muted-foreground font-sans leading-relaxed">
                  "Um lugar que redefine o conceito de paz e exclusividade."
                </p>
              </motion.div>
              
              {/* Abstract Shape Decor */}
              <div className="absolute -top-12 -right-12 w-64 h-64 border border-gold/10 rounded-full -z-0" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Galeria / Destaques (Design Editorial de Luxo) */}
      <section className="relative py-32 bg-[#100D0A] z-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <span className="text-gold font-sans font-bold text-xs uppercase tracking-[0.4em] mb-6 block">
                Galeria de Destaques
              </span>
              <h2 className="text-5xl md:text-8xl font-serif font-light text-warm-white leading-[0.95] tracking-tighter">
                Onde o luxo encontra a <span className="italic text-gold block md:inline">natureza.</span>
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:pb-4"
            >
              <p className="text-warm-white/40 font-sans text-lg max-w-xs leading-relaxed border-l border-gold/30 pl-6">
                Uma curadoria visual dos espaços que tornam nossa hospedagem um refúgio singular em Florianópolis.
              </p>
            </motion.div>
          </div>

          {/* New Interactive Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-6 gap-6 h-auto md:h-[1000px]">
            {/* Foto 1: A-Frame Exterior - O Impacto Principal */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:col-span-8 md:row-span-4 relative group overflow-hidden rounded-3xl"
            >
              <img src={heroAsset.url} className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110" alt="Arquitetura" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
              <div className="absolute bottom-10 left-10 p-2">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "40px" }}
                  viewport={{ once: true }}
                  className="h-0.5 bg-gold mb-4" 
                />
                <h3 className="text-3xl md:text-4xl font-serif text-white mb-2 tracking-wide">Arquitetura Signature</h3>
                <p className="text-warm-white/70 font-sans text-sm tracking-widest uppercase">Design A-Frame Exclusivo</p>
              </div>
            </motion.div>

            {/* Foto 2: Quarto - O Conforto Vertical */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:col-span-4 md:row-span-3 relative group overflow-hidden rounded-3xl"
            >
              <img src={quartoAsset.url} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" alt="Suíte" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-700" />
              <div className="absolute top-8 right-8">
                <span className="bg-white/10 backdrop-blur-md text-white text-[10px] uppercase tracking-widest px-4 py-2 rounded-full border border-white/20">
                  Suíte Master
                </span>
              </div>
            </motion.div>

            {/* Foto 3: Banheira - O Relaxamento */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="md:col-span-4 md:row-span-3 relative group overflow-hidden rounded-3xl"
            >
              <img src={banheiraAsset.url} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" alt="Banheira" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-700" />
              <div className="absolute bottom-8 left-8">
                <h4 className="text-xl font-serif text-white italic">Self-Care moments</h4>
              </div>
            </motion.div>

            {/* Foto 4: Sala - A Integração */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="md:col-span-5 md:row-span-2 relative group overflow-hidden rounded-3xl"
            >
              <img src={salaAsset.url} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" alt="Living" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-700" />
            </motion.div>

            {/* Foto 5: Cozinha - A Praticidade */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="md:col-span-3 md:row-span-2 relative group overflow-hidden rounded-3xl"
            >
              <img src={cozinhaAsset.url} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" alt="Gastronomia" />
              <div className="absolute inset-0 bg-gold/10 group-hover:bg-transparent transition-all duration-700" />
            </motion.div>
          </div>
        </div>

        {/* Floating Accent */}
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />
      </section>




      {/* Seção Concierge Virtual */}
      <section className="relative py-28 md:py-36 bg-[#F7F3EA] z-20 overflow-hidden grain">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-gold font-sans font-bold text-xs uppercase tracking-[0.2em] mb-4 block">
                Seu guia durante a experiência
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-light text-dark-brown mb-6 leading-tight tracking-tight">
                Tudo o que você precisar durante sua estadia, <span className="italic">a poucos toques.</span>
              </h2>
              <p className="text-xl text-muted-foreground font-sans mb-10 leading-relaxed max-w-xl font-light">
                Conheça nosso Concierge Virtual: um atendimento exclusivo pelo WhatsApp para ajudar você a aproveitar melhor a hospedagem e descobrir o melhor da região.
              </p>

              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {[
                  { title: "Sobre a hospedagem", desc: "Tire dúvidas sobre check-in, comodidades e regras.", icon: Home },
                  { title: "Explore a região", desc: "Sugestões personalizadas do Sul da Ilha.", icon: Compass },
                  { title: "Gastronomia Local", desc: "Descubra os melhores sabores perto de você.", icon: UtensilsCrossed },
                  { title: "Check-in Digital", desc: "Processo ágil e informações sempre à mão.", icon: Smartphone }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -5, borderColor: "rgba(197, 154, 85, 0.5)" }}
                    className="p-8 rounded-[2rem] glass-warm group cursor-default transition-all duration-500"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-warm-white/60 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:bg-gold transition-all group-hover:rotate-6 ring-1 ring-gold/10">
                      <item.icon className="w-6 h-6 text-gold group-hover:text-white transition-colors" />
                    </div>
                    <h4 className="font-serif text-dark-brown text-xl mb-3">{item.title}</h4>
                    <p className="text-[13px] text-muted-foreground font-sans leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}


              </div>


              
              <p className="mt-8 text-sm italic text-dark-brown/60 font-serif">
                "Você aproveita a viagem. Nós cuidamos dos detalhes."
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative flex justify-center lg:justify-end lg:-mr-12 xl:-mr-20 lg:scale-110 xl:scale-125"
            >
              {/* Mockup Smartphone Premium */}
              <div className="relative w-[310px] h-[630px] bg-[#121212] rounded-[3.5rem] border-[10px] border-[#222] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden ring-1 ring-white/10 scale-90 md:scale-100">


                {/* Speaker & Sensor */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#222] rounded-b-2xl z-30 flex items-center justify-center">
                  <div className="w-8 h-1 bg-[#333] rounded-full" />
                </div>
                
                {/* Status Bar */}
                <div className="absolute top-0 w-full h-8 flex justify-between px-8 pt-2 text-[10px] text-white z-20 font-sans font-medium">
                  <span>9:41</span>
                  <div className="flex gap-1.5 items-center">
                    <div className="flex gap-0.5">
                      <div className="w-0.5 h-1.5 bg-white rounded-full opacity-40" />
                      <div className="w-0.5 h-2 bg-white rounded-full opacity-60" />
                      <div className="w-0.5 h-2.5 bg-white rounded-full" />
                    </div>
                    <Wifi className="w-3 h-3" />
                    <div className="w-4 h-2 border border-white/40 rounded-[2px] relative">
                      <div className="absolute top-0.5 left-0.5 bottom-0.5 right-1 bg-white rounded-[1px]" />
                    </div>
                  </div>
                </div>

                {/* WhatsApp Premium Header */}
                <div className="bg-[#075e54] pt-9 pb-4 px-5 flex items-center gap-3 shadow-lg relative z-20">
                  <div className="w-10 h-10 rounded-full bg-white/10 p-0.5 shadow-inner">
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <img src={heroAsset.url} className="w-full h-full object-cover scale-150" />
                    </div>
                  </div>
                  <div>
                    <h5 className="text-white text-[13px] font-bold font-sans tracking-wide">Concierge Villa A-Frame</h5>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-[#4ade80] rounded-full animate-pulse" />
                      <span className="text-[10px] text-white/80 font-medium">online</span>
                    </div>
                  </div>
                </div>

                {/* Chat Background with subtle pattern */}
                <div className="absolute inset-0 top-[88px] bg-[#efe7de] z-0 opacity-90" />
                <div className="absolute inset-0 top-[88px] bg-[url('https://i.pinimg.com/originals/97/e5/77/97e57723907727a858e38d4e9c7041c2.png')] opacity-[0.03] z-0" />
                
                {/* Messages Area */}
                <div className="relative z-10 p-5 space-y-5 font-sans overflow-hidden h-[480px]">
                  <motion.div 
                    initial={{ opacity: 0, y: 10, x: 20 }}
                    whileInView={{ opacity: 1, y: 0, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="self-end ml-auto bg-[#dcf8c6] p-3 rounded-2xl rounded-tr-none text-[11px] shadow-[0_2px_5px_rgba(0,0,0,0.05)] max-w-[85%] text-[#1a1a1a] leading-relaxed relative"
                  >
                    Oi! O que você recomenda para jantar hoje?
                    <span className="block text-[9px] text-black/40 text-right mt-1 font-medium">20:00</span>
                    <div className="absolute top-0 -right-2 w-0 h-0 border-t-[8px] border-t-[#dcf8c6] border-r-[8px] border-r-transparent" />
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 10, x: -20 }}
                    whileInView={{ opacity: 1, y: 0, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.8 }}
                    className="bg-white p-3 rounded-2xl rounded-tl-none text-[11px] shadow-[0_2px_5px_rgba(0,0,0,0.05)] max-w-[90%] text-[#1a1a1a] leading-relaxed relative"
                  >
                    Boa noite! 😊 Se vocês quiserem experimentar a gastronomia do Ribeirão da Ilha, posso indicar algumas opções de frutos do mar. Se preferirem algo mais romântico, também posso sugerir lugares especiais para um jantar a dois.
                    <span className="block text-[9px] text-black/40 text-right mt-1 font-medium">20:01</span>
                    <div className="absolute top-0 -left-2 w-0 h-0 border-t-[8px] border-t-white border-l-[8px] border-l-transparent" />
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 10, x: 20 }}
                    whileInView={{ opacity: 1, y: 0, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 3.5 }}
                    className="self-end ml-auto bg-[#dcf8c6] p-3 rounded-2xl rounded-tr-none text-[11px] shadow-[0_2px_5px_rgba(0,0,0,0.05)] max-w-[85%] text-[#1a1a1a] leading-relaxed relative"
                  >
                    E o que podemos fazer amanhã?
                    <span className="block text-[9px] text-black/40 text-right mt-1 font-medium">20:05</span>
                    <div className="absolute top-0 -right-2 w-0 h-0 border-t-[8px] border-t-[#dcf8c6] border-r-[8px] border-r-transparent" />
                  </motion.div>
                </div>

                {/* Glassmorphism Input Bar */}
                <div className="absolute bottom-6 w-[90%] left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md rounded-full py-2.5 px-5 flex items-center justify-between shadow-xl ring-1 ring-black/5">
                  <span className="text-black/40 text-[11px] font-medium">Digite uma mensagem...</span>
                  <div className="w-8 h-8 bg-[#075e54] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Enhanced Decorative Elements */}
              <div className="absolute -z-10 -bottom-20 -right-20 w-80 h-80 bg-gold/15 rounded-full blur-[100px] animate-pulse" />
              <div className="absolute -z-10 -top-20 -left-20 w-80 h-80 bg-gold/5 rounded-full blur-[80px]" />

            </motion.div>
          </div>
        </div>
      </section>

      {/* Avaliações */}
      <section className="relative py-28 md:py-36 px-4 bg-warm-white z-20">
        <div className="max-w-6xl mx-auto text-center mb-16">
        <div className="max-w-6xl mx-auto text-center mb-16 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex flex-col items-center gap-2 mb-8"
          >
            <div className="flex gap-1 mb-2">
              {"★★★★★".split("").map((s, i) => (
                <Star key={i} className="w-5 h-5 fill-gold text-gold" />
              ))}
            </div>
            <span className="text-3xl font-serif text-dark-brown">5,0 / 5,0</span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">Avaliação Impecável</span>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-serif font-light text-dark-brown mb-6 tracking-tight">Preferido dos <span className="italic text-gold">Hóspedes</span></h2>
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-light">
            <span className="text-gold font-bold">100%</span> das experiências são avaliadas com nota máxima
          </p>
          
        </div>

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
                { author: "Alice", text: "Tudo simplesmente maravilhoso! O chalé é incrível, tudo muito limpo e bem feito.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&auto=format&fit=crop" },
                { author: "Bruna", text: "Chalé maravilhoso, com decoração de muito bom gosto, ótima climatização, vista perfeita.", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&auto=format&fit=crop" },
                { author: "Higor Daniel", text: "O chalé superou as expectativas. A vista para o mar é simplesmente incrível.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&auto=format&fit=crop" },
                { author: "Jakcson", text: "Lugar muito aconchegante, visual espetacular, meio da natureza, vista do mar indescritível.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&auto=format&fit=crop" }
              ].map((rev, i) => (
                <div key={`${idx}-${i}`} className="min-w-[400px] bg-card p-10 rounded-[2.5rem] border border-beige/20 flex flex-col justify-between group hover:border-gold/30 transition-all duration-500">
                  <div>
                    <div className="flex text-gold mb-6">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-gold" />)}
                    </div>
                    <p className="text-lg font-serif italic text-dark-brown/90 mb-8 whitespace-normal leading-relaxed">
                      "{rev.text}"
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-gold to-beige">
                      <img src={rev.avatar} alt={rev.author} className="w-full h-full rounded-full object-cover border-2 border-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-dark-brown tracking-tight">{rev.author}</p>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Hóspede verificado</p>
                    </div>
                  </div>
                </div>
              ))
            ))}

          </motion.div>
        </div>
      </section>

      {/* Detalhes do Imóvel (Airbnb Info) */}
      <section className="relative py-28 md:py-36 px-4 bg-background z-20">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[10px] uppercase tracking-[0.45em] text-gold font-sans font-semibold mb-5 block">Comodidades</span>
            <h2 className="text-4xl md:text-6xl font-serif font-light text-dark-brown mb-4 tracking-tight">O que preparamos para você.</h2>
            <div className="w-16 h-0.5 bg-gold mx-auto opacity-60" />

          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8 text-center md:text-left"
            >
              <h3 className="text-2xl font-serif text-dark-brown border-b border-beige/30 pb-4">O Espaço</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center md:justify-items-start">
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
              className="space-y-8 text-center md:text-left"
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
                  <div key={i} className="flex items-center gap-4 p-5 bg-card rounded-2xl border border-beige/30 hover:border-gold/50 hover:shadow-lux transition-all duration-500 group">
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
      <section className="relative py-36 md:py-48 px-4 flex flex-col items-center justify-center text-center text-warm-white z-20 grain">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src={heroAsset.url}
            alt="Chalé ao pôr do sol"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-soft-black/80 via-soft-black/65 to-soft-black/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(23,19,15,0.7)_100%)]" />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-2xl px-4"
        >
          <h2 className="text-4xl md:text-6xl font-serif font-light mb-6 leading-[1.08] tracking-tight">
            Viva momentos únicos neste paraíso em <span className="italic text-gold">Florianópolis.</span>
          </h2>
          <p className="text-base font-sans mb-8 opacity-80 max-w-lg mx-auto font-light leading-relaxed">
            Garanta sua data e aproveite uma experiência exclusiva em meio à natureza.
          </p>
          <motion.a
            href={content.airbnb_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackClick.mutate({ source: 'cta_final' })}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(197, 154, 85, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-4 bg-gold text-white px-12 py-6 rounded-full font-sans font-bold tracking-[0.2em] text-xs md:text-sm overflow-hidden shadow-2xl transition-all"
          >
            <span className="relative z-10">RESERVE AGORA NO AIRBNB</span>
            <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-0 opacity-10" />
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform" />
          </motion.a>

        </motion.div>
      </section>
      
      {/* Botão Fixo Mobile Removido */}


      {/* Footer */}
      <footer className="relative bg-dark-brown pt-24 pb-12 px-4 text-warm-white z-20 grain">
        <div className="absolute top-0 inset-x-0 rule-gold" />
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
        
        <div className="pt-8 border-t border-white/5 flex flex-col items-center gap-4">
          <p className="text-[10px] uppercase tracking-widest opacity-30">
            &copy; {new Date().getFullYear()} Chalé A-Frame Florianópolis. Todos os direitos reservados.
          </p>
          <Link 
            to="/admin" 
            className="text-[9px] uppercase tracking-[0.2em] opacity-10 hover:opacity-40 transition-opacity"
          >
            Acesso Restrito
          </Link>
        </div>
      </footer>
    </div>
  );
}
