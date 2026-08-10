import { createServerFn } from "@tanstack/react-tanstack-start";
import { z } from "zod";
import { supabase } from "./supabase/client";

// Tipos para o gerenciamento de conteúdo
export const SiteContentSchema = z.object({
  chale_name: z.string(),
  hero_title: z.string(),
  hero_subtitle: z.string(),
  hero_description: z.string(),
  about_title: z.string(),
  about_text_1: z.string(),
  about_text_2: z.string(),
  airbnb_url: z.string(),
});

export type SiteContent = z.infer<typeof SiteContentSchema>;

// Função para buscar conteúdo (pública)
export const getSiteContent = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .single();
    
    if (error) {
      // Retorna valores padrão se não houver dados no banco
      return {
        chale_name: "Chalé A-Frame Florianópolis",
        hero_title: "Conecte-se com o que realmente importa.",
        hero_subtitle: "CHALÉ EXCLUSIVO EM FLORIANÓPOLIS",
        hero_description: "Um refúgio privativo entre a natureza e o mar, criado para momentos inesquecíveis.",
        about_title: "Seu refúgio entre a natureza e o mar",
        about_text_1: "Desfrute de uma experiência única em um chalé privativo, cercado pela natureza e com uma vista encantadora para o mar.",
        about_text_2: "Com arquitetura em estilo A-frame, estrutura em madeira, amplas paredes de vidro e ambientes integrados, o espaço foi pensado para proporcionar conforto, privacidade e momentos especiais.",
        airbnb_url: "https://www.airbnb.com.br/rooms/1703914788039625027",
      };
    }
    
    return data as SiteContent;
  });

// Função para rastrear cliques (pública)
export const trackAirbnbClick = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ source: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const { error } = await supabase.from("airbnb_clicks").insert({
      source: data.source,
      clicked_at: new Date().toISOString(),
    });
    
    if (error) console.error("Erro ao rastrear clique:", error);
    return { success: true };
  });
