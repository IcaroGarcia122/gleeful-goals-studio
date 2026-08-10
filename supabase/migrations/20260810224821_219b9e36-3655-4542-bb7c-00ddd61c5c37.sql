-- 1. Create app_role enum
create type public.app_role as enum ('admin', 'moderator', 'user');

-- 2. Set Up the user_roles Table
create table public.user_roles (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    role app_role not null,
    unique (user_id, role)
);

-- 3. Grant Data API access to user_roles
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;

-- 4. Enable Row-Level Security on user_roles
alter table public.user_roles enable row level security;

-- 5. Create a Security Definer Function
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- 6. Create site_content table
create table public.site_content (
    id uuid primary key default gen_random_uuid(),
    chale_name text not null default 'Chalé A-Frame Florianópolis',
    hero_title text not null default 'Conecte-se com o que realmente importa.',
    hero_subtitle text not null default 'CHALÉ EXCLUSIVO EM FLORIANÓPOLIS',
    hero_description text not null default 'Um refúgio privativo entre a natureza e o mar, criado para momentos inesquecíveis.',
    about_title text not null default 'Seu refúgio entre a natureza e o mar',
    about_text_1 text not null default 'Desfrute de uma experiência única em um chalé privativo, cercado pela natureza e com uma vista encantadora para o mar.',
    about_text_2 text not null default 'Com arquitetura em estilo A-frame, estrutura em madeira, amplas paredes de vidro e ambientes integrados, o espaço foi pensado para proporcionar conforto, privacidade e momentos especiais.',
    airbnb_url text not null default 'https://www.airbnb.com.br/rooms/1703914788039625027',
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

grant select on public.site_content to anon, authenticated;
grant all on public.site_content to authenticated;
grant all on public.site_content to service_role;

alter table public.site_content enable row level security;

create policy "Anyone can view site content" on public.site_content for select to anon, authenticated using (true);
create policy "Admins can manage site content" on public.site_content for all to authenticated using (public.has_role(auth.uid(), 'admin'));

-- 7. Create guests table
create table public.guests (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    email text,
    phone text,
    check_in date,
    check_out date,
    num_guests integer default 2,
    status text check (status in ('pending', 'confirmed', 'cancelled', 'completed')) default 'pending',
    notes text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

grant select, insert, update, delete on public.guests to authenticated;
grant all on public.guests to service_role;

alter table public.guests enable row level security;

create policy "Admins can manage guests" on public.guests for all to authenticated using (public.has_role(auth.uid(), 'admin'));

-- 8. Create airbnb_clicks table
create table public.airbnb_clicks (
    id uuid primary key default gen_random_uuid(),
    source text not null,
    device text,
    created_at timestamptz default now()
);

grant insert on public.airbnb_clicks to anon, authenticated;
grant select on public.airbnb_clicks to authenticated;
grant all on public.airbnb_clicks to service_role;

alter table public.airbnb_clicks enable row level security;

create policy "Anyone can record clicks" on public.airbnb_clicks for insert to anon, authenticated with check (true);
create policy "Admins can view clicks" on public.airbnb_clicks for select to authenticated using (public.has_role(auth.uid(), 'admin'));

-- 9. Create tasks table
create table public.tasks (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    completed boolean default false,
    created_at timestamptz default now()
);

grant all on public.tasks to authenticated;
grant all on public.tasks to service_role;

alter table public.tasks enable row level security;

create policy "Admins can manage tasks" on public.tasks for all to authenticated using (public.has_role(auth.uid(), 'admin'));

-- Insert initial content
insert into public.site_content (hero_title) values ('Conecte-se com o que realmente importa.');
