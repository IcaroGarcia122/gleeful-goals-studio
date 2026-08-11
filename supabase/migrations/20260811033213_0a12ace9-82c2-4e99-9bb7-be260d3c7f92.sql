-- Create Local Recommendations table
CREATE TABLE public.local_recommendations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    category text NOT NULL CHECK (category IN ('🍽 Restaurantes', '🏖 Praias', '🥾 Trilhas', '🛒 Mercados', '💊 Farmácias', '🚤 Passeios', '📸 Pontos turísticos', '☕ Cafés')),
    description text,
    address text,
    google_maps_url text,
    image_url text,
    is_recommended boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create Concierge Settings table
CREATE TABLE public.concierge_settings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    is_active boolean DEFAULT true,
    name text DEFAULT 'Villa Concierge',
    welcome_message text DEFAULT 'Olá! Sou o Concierge Virtual da Villa do Poente...',
    tone text CHECK (tone IN ('Acolhedor', 'Profissional', 'Descontraído', 'Sofisticado')),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create Knowledge Base table
CREATE TABLE public.knowledge_base (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    category text NOT NULL CHECK (category IN ('Hospedagem', 'Regras', 'Check-in', 'Checkout', 'Comodidades', 'Guia da região', 'Emergências')),
    question text NOT NULL,
    answer text NOT NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create Automations table
CREATE TABLE public.whatsapp_automations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    type text NOT NULL CHECK (type IN ('Pré-estadia', 'Boas-vindas', 'Durante a estadia', 'Checkout', 'Pós-estadia')),
    is_active boolean DEFAULT false,
    days_relative integer DEFAULT 0,
    send_time time DEFAULT '10:00:00',
    message_template text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Grants
GRANT SELECT, INSERT, UPDATE, DELETE ON public.local_recommendations TO authenticated;
GRANT ALL ON public.local_recommendations TO service_role;
GRANT SELECT ON public.local_recommendations TO anon;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.concierge_settings TO authenticated;
GRANT ALL ON public.concierge_settings TO service_role;
GRANT SELECT ON public.concierge_settings TO anon;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.knowledge_base TO authenticated;
GRANT ALL ON public.knowledge_base TO service_role;
GRANT SELECT ON public.knowledge_base TO anon;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.whatsapp_automations TO authenticated;
GRANT ALL ON public.whatsapp_automations TO service_role;

-- RLS
ALTER TABLE public.local_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.concierge_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_base ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whatsapp_automations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view recommendations" ON public.local_recommendations FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage recommendations" ON public.local_recommendations FOR ALL TO authenticated USING (true);

CREATE POLICY "Anyone can view concierge settings" ON public.concierge_settings FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage concierge settings" ON public.concierge_settings FOR ALL TO authenticated USING (true);

CREATE POLICY "Anyone can view knowledge base" ON public.knowledge_base FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage knowledge base" ON public.knowledge_base FOR ALL TO authenticated USING (true);

CREATE POLICY "Authenticated users can manage automations" ON public.whatsapp_automations FOR ALL TO authenticated USING (true);

-- Seed initial data
INSERT INTO public.concierge_settings (name, welcome_message, tone) VALUES ('Villa Concierge', 'Olá! Sou o Concierge Virtual da Villa do Poente...', 'Acolhedor');
INSERT INTO public.whatsapp_automations (type, is_active, days_relative, send_time, message_template) VALUES 
('Pré-estadia', true, 2, '10:00:00', 'Olá {{nome}}! 👋 Sua estadia na Villa do Poente está chegando. Seu check-in será no dia {{check_in}}.'),
('Boas-vindas', true, 0, '14:00:00', 'Seja bem-vindo(a), {{nome}}! Que sua estadia seja maravilhosa.'),
('Checkout', true, 1, '10:00:00', 'Olá {{nome}}! Lembrando que seu checkout é amanhã às 11:00.');
