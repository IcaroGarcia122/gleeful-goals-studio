import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

// Public function to fetch content
export const getSiteContent = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data, error } = await supabase
      .from('site_content')
      .select('*')
      .single();
    
    if (error || !data) {
      return {
        id: "",
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
    return data;
  });

// Public function to track clicks
export const trackAirbnbClick = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({ source: z.string() }).parse(data))
  .handler(async ({ data }) => {
    await supabase.from('airbnb_clicks').insert({ 
      source: data.source,
      device: 'web'
    });
    return { success: true };
  });

// Protected Admin Functions
export const updateSiteContent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: unknown) => z.object({
    id: z.string(),
    hero_title: z.string(),
    hero_description: z.string(),
    about_title: z.string(),
    about_text_1: z.string(),
    about_text_2: z.string(),
    airbnb_url: z.string(),
  }).parse(data))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from('site_content')
      .update(data)
      .eq('id', data.id);
    if (error) throw error;
    return { success: true };
  });

export const getDashboardStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { count: clicks } = await context.supabase
      .from('airbnb_clicks')
      .select('*', { count: 'exact', head: true });
    
    const { count: guests } = await context.supabase
      .from('guests')
      .select('*', { count: 'exact', head: true });
      
    return {
      clicks: clicks || 0,
      guests: guests || 0,
      conversionRate: 0.12,
    };
  });
