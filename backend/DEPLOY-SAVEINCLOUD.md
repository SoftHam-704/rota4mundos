# Deploy da API na SaveInCloud

A API (Node + Express + Prisma + cron da IRIS) roda num nó Node.js da SaveInCloud,
no mesmo ambiente do PostgreSQL `base_rota`. O site (frontend) continua na hospedagem Apache.

## 1. Nó Node.js

- Painel SaveInCloud → ambiente do banco (`salesmaster`) → **Alterar topologia** → adicionar nó **Node.js 20+**
  (o mesmo ambiente deixa API e banco na rede interna).
- 1 nó só: o cron da IRIS roda dentro do processo. Com 2+ nós a busca diária roda em duplicidade.
- Gerenciador de processo: `npm` (executa `npm start` → `node src/server.js`).

## 2. Código

Deploy via Git (repositório do projeto, branch `main`). Como a API fica em `backend/`,
o diretório da aplicação precisa apontar para essa subpasta: ajuste no painel (variável `ROOT_DIR`
do nó ou script de deploy) e confirme que `npm install` roda dentro de `backend/`.
O `postinstall` já gera o Prisma Client.

## 3. Variáveis de ambiente (Variáveis do nó)

Copiar **todas** do Railway (Variables → Raw Editor) antes de desligá-lo. Mínimo:

| Variável | Valor |
|---|---|
| `NODE_ENV` | `production` |
| `PORT` | porta que o nó Node.js expõe (padrão do contêiner) |
| `DATABASE_URL` | URL **interna** do PostgreSQL no ambiente |
| `JWT_SECRET` | o mesmo do Railway (senão todos os logins caem) |
| `CORS_ORIGIN` | `https://rota4mundos.com.br,https://www.rota4mundos.com.br` |
| `APP_BASE_URL` | `https://api.rota4mundos.com.br` |
| `UPLOAD_DIR` | diretório persistente, ex.: `/home/jelastic/uploads` (fora da pasta do deploy) |
| `ANTHROPIC_API_KEY` | chave válida, conferir saldo (a IRIS depende dela) |
| `SMTP_*`, `OPENAI_API_KEY`, `GEMINI_API_KEY`, `AI_PROVIDER_ORDER` | iguais ao Railway |

Não rodar `prisma migrate deploy` na virada: o banco já está com o schema em dia.

## 4. Domínio

- DNS: `api.rota4mundos.com.br` → endereço do ambiente (CNAME ou IP público).
- Painel: vincular o domínio externo ao ambiente e emitir SSL (Let's Encrypt).

## 5. Validação antes da virada

```bash
curl https://api.rota4mundos.com.br/health          # {"status":"ok","environment":"production"}
curl "https://api.rota4mundos.com.br/api/articles?limit=1"
```

Nos logs do nó deve aparecer `IRIS: cron diário agendado para 07:00`.

## 6. Virada

1. `frontend/.env.production` → `VITE_API_URL=https://api.rota4mundos.com.br/api`
2. `npm run build` no frontend e subir o `dist/` para a hospedagem do site.
3. Testar login no admin, curtidas e cadastro de colaborador no site real.
4. Só então desligar o serviço no Railway.
