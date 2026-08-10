import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Schema for the content
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

// Public function to fetch content
// Using hardcoded data for now since we are in bootstrap phase
export const getSiteContent = createServerFn({ method: "GET" })
  .handler(async () => {
    return {
      chale_name: "Chalé A-Frame Florianópolis",
      hero_title: "Conecte-se com o que realmente importa.",
      hero_subtitle: "CHALÉ EXCLUSIVO EM FLORIANÓPOLIS",
      hero_description: "Um refúgio privativo entre a natureza e o mar, criado para momentos inesquecíveis.",
      about_title: "Seu refúgio entre a natureza e o mar",
      about_text_1: "Desfrute de uma experiência única em um chalé privativo, cercado pela natureza e com uma vista encantadora para o mar.",
      about_text_2: "Com arquitetura em estilo A-frame, estrutura em madeira, amplas paredes de vidro e ambientes integrados, o espaço foi pensado para proporcionar conforto, privacidade e momentos especiais.",
      airbnb_url: "https://www.airbnb.com.br/rooms/1703914788039625027?check_in=2026-08-14&check_out=2026-08-16&photo_id=2671539491&source_impression_id=p3_1786390576_P3f9fEn5mdJg-5AB&previous_page_section_name=1000",
    };
  });

// Public function to track clicks
export const trackAirbnbClick = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => z.object({ source: z.string() }).parse(data))
  .handler(async ({ data }: { data: { source: string } }) => {
    console.log("Airbnb click tracked from:", data.source);
    return { success: true };
  });
