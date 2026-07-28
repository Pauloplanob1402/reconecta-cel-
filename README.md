# Reconecta Cel

Site de captação para conserto e venda de celulares usados. O formulário salva os pedidos direto no Supabase.

## Como publicar (tudo pelo navegador, sem terminal)

### 1. Criar as tabelas no Supabase
1. Acesse supabase.com e crie um novo projeto (ou use um existente, pode ser o mesmo do Direito Mãe se preferir separar por projeto depois).
2. Vá em **SQL Editor** e cole o conteúdo do arquivo `supabase_schema.sql`. Rode.
3. Vá em **Project Settings → API** e copie:
   - **Project URL**
   - **Publishable key** (às vezes chamada de "anon public key")

### 2. Subir o código no GitHub
1. Crie um repositório novo no GitHub (ex: `reconecta-cel`).
2. Suba todos os arquivos desta pasta pelo "Add file → Upload files" — **arraste a pasta `src` inteira**, não os arquivos soltos, senão o GitHub perde a estrutura de pastas.

### 3. Publicar na Vercel
1. Acesse vercel.com, clique em **Add New → Project** e importe o repositório.
2. Em **Environment Variables**, adicione:
   - `VITE_SUPABASE_URL` → a Project URL do Supabase
   - `VITE_SUPABASE_ANON_KEY` → a Publishable key do Supabase
3. Clique em **Deploy**.

## Onde ver os pedidos
No painel do Supabase, vá em **Table Editor → contatos**. Cada linha é um pedido: nome, telefone, tipo (conserto/compra/venda) e descrição.

## Antes de divulgar
- Troque o número de WhatsApp no código (`WHATSAPP` em `src/App.jsx`) se não for o `51997612770`.
- Considere adicionar fotos reais de aparelhos consertados/vendidos assim que tiver.
