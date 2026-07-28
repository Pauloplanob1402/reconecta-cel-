-- Rode isso no SQL Editor do Supabase antes de publicar o site

create table if not exists public.contatos (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  telefone text not null,
  tipo text not null,
  modelo text,
  descricao text,
  status text default 'novo',
  created_at timestamptz default now()
);

-- Se voce ja criou a tabela antes sem a coluna modelo, rode esta linha separadamente:
-- alter table public.contatos add column if not exists modelo text;

alter table public.contatos enable row level security;

-- Permite que qualquer visitante do site INSIRA um novo contato (necessario para o formulario funcionar)
create policy "Permitir insercao publica de contatos"
on public.contatos
for insert
to anon
with check (true);

-- Ninguem consegue LER os contatos pela chave publica (anon) -- so voce, pelo painel do Supabase
