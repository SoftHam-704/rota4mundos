# Deploy da API na SaveInCloud

Produção desde 2026-10-02: **https://api.rota4mundos.com.br** (ambiente `rotabio`).
O site (frontend) continua na hospedagem cPanel (`public_html`), com DNS na HostGator.

## Topologia do ambiente `rotabio`

| Nó | Id | Função |
|---|---|---|
| Nginx 1.30 (`bl`) | 275202 | IP público 200.229.77.237, TLS Let's Encrypt, proxy para o Node |
| Node.js (`cp`, pm2) | 275201 | API em `:8080` (IP interno 10.100.74.103), 1 nó só (o cron da IRIS roda no processo) |

O banco `base_rota` fica no cluster `salesmaster`, **compartilhado com o SalesMaster**.
A API acessa pela rede interna: `node254557-salesmaster…:5432`. A porta externa 13062 recusa
conexões vindas de dentro da plataforma.

## Nginx (configuração manual)

Ao adicionar o balanceador, a plataforma não gerou a configuração de proxy. O arquivo
`/etc/nginx/nginx-jelastic.conf` foi escrito à mão e:
- atende **somente** `api.rota4mundos.com.br`; acesso por IP ou outro nome recebe 444;
- redireciona HTTP para HTTPS;
- usa o certificado do add-on Let's Encrypt (`/var/lib/jelastic/SSL/jelastic.{chain,key}`), que renova sozinho.

Backups no nó: `/var/lib/nginx/nginx-jelastic.conf.orig-20261002` (padrão da imagem) e `.http-only`.
**Se o IP do Node mudar ou um nó for adicionado, o `upstream common` precisa ser atualizado à mão.**
O add-on gera um `conf.d/ssl.conf`, que **não** é incluído, porque depende do modelo completo da plataforma.

## Código

Deploy via Git (repositório público, branch `main`, contexto `ROOT`). Variáveis do nó:
`ROOT_DIR=/home/jelastic/ROOT/backend`, `APP_FILE=src/server.js`. O `postinstall` gera o Prisma Client.
Para atualizar: painel → `rotabio` → Deployments → Update (ou API `environment/vcs/rest/update`).

## Variáveis de ambiente (nó Node)

| Variável | Valor |
|---|---|
| `NODE_ENV` | `production` |
| `PORT` | `8080` |
| `DATABASE_URL` | URL do `base_rota` com host `node254557-salesmaster…` e porta **5432** |
| `CORS_ORIGIN` | `https://rota4mundos.com.br,https://www.rota4mundos.com.br` |
| `APP_BASE_URL` | `https://api.rota4mundos.com.br` |
| `UPLOAD_DIR` | `/home/jelastic/uploads` (fora da pasta do deploy) |
| `JWT_SECRET`, `ANTHROPIC_API_KEY`, `SMTP_*`, `OPENAI_API_KEY`, `GEMINI_API_KEY`, `AI_PROVIDER_ORDER` | iguais ao `backend/.env` |

## Frontend

`frontend/.env.production` → `VITE_API_URL=https://api.rota4mundos.com.br/api`.
Faça `npm run build` e envie `dist/index.html`, `dist/assets/*` e `dist/.htaccess` para `public_html/`.
O `.htaccess` publicado tem `Cache-Control: no-cache` para `index.(html|js|css)`, porque os nomes
são fixos (sem hash).
