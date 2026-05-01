# 🌎 Portal da Rota Bioceânica

**Full-stack application** para divulgação e gestão da Rota Bioceânica — conectando o Brasil ao Pacífico através de um corredor estratégico de desenvolvimento, infraestrutura e investimentos.

![Tech Stack](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Node](https://img.shields.io/badge/Node.js-18+-339933?logo=nodedotjs)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?logo=postgresql)
![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma)
![Tailwind](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss)

---

## ✨ Destaques

- 🎨 **HERO Cinematográfica** com sol por trás da ponte bioceânica, partículas animadas e silhuetas
- 🌍 **Internacionalização** completa (Português, English, Español)
- 📊 **Dashboard administrativo** com gráficos e métricas em tempo real
- 🔐 **Autenticação JWT** com roles (Admin, Editor, Leitor)
- 🏙️ **CRUD completo** de cidades, artigos e newsletter
- 📱 **Design responsivo** com Tailwind CSS + Framer Motion
- ☁️ **Preparado para AWS** (EC2, RDS, S3)

---

## 🏗️ Arquitetura

```
/backend                    # Node.js + Express + Prisma
  /src
    /config                 # Database, Logger, Env
    /middlewares            # Auth, Error, Validation, Rate Limit
    /modules                # Auth, Cities, Articles, Comments, Newsletter, Users, Settings
    /utils                  # ApiResponse, AsyncHandler
    /routes                 # Upload routes
  /prisma
    schema.prisma           # Modelagem completa do banco
    seed.js                 # Dados iniciais

/frontend                   # React 18 + Vite
  /src
    /api                    # Axios client + endpoints
    /components             # Hero, Navbar, Footer, Sections
    /components/admin       # AdminSidebar
    /features               # Módulos organizados
    /hooks                  # Custom hooks
    /i18n                   # PT/EN/ES translations
    /layouts                # Public + Admin layouts
    /pages/public           # Home, Cities, Articles, Login
    /pages/admin            # Dashboard, AdminCities, AdminArticles
    /stores                 # Zustand auth store
    /styles                 # Global CSS + Tailwind
```

---

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js 18+
- PostgreSQL 14+
- npm ou pnpm

### 1. Clone e entre no diretório
```bash
cd e:/Sistemas_ia/Rotabio
```

### 2. Configure o Backend
```bash
cd backend

# Instale dependências
npm install

# Configure variáveis de ambiente
cp .env.example .env
# Edite .env com suas credenciais PostgreSQL

# Execute migrations e seed
npx prisma migrate dev --name init
npx prisma db seed

# Inicie o servidor
npm run dev
```

**Backend rodando em:** `http://localhost:3333`

### 3. Configure o Frontend
```bash
cd ../frontend

# Instale dependências
npm install

# Configure variáveis de ambiente
cp .env.example .env

# Inicie o Vite
npm run dev
```

**Frontend rodando em:** `http://localhost:5173`

---

## 🔑 Contas de Demonstração

| Email | Senha | Role |
|-------|-------|------|
| admin@rotabio.com | admin@123 | ADMIN |
| editor@rotabio.com | editor@123 | EDITOR |

---

## 🗄️ Modelagem do Banco (Prisma)

- **User** — usuários com roles (ADMIN, EDITOR, LEITOR)
- **City** — cidades da rota com geolocalização
- **CityImage / CityStatistic** — imagens e dados econômicos
- **Article** — artigos/notícias com status (DRAFT, PUBLISHED, SCHEDULED)
- **Category / Tag** — categorização de conteúdo
- **Comment** — comentários com moderação
- **NewsletterSubscriber** — inscritos da newsletter
- **SiteSetting / AuditLog / Media** — configurações, logs e uploads

---

## 🛡️ Segurança

- ✅ Hash de senha com bcrypt (salt 12)
- ✅ JWT com expiração configurável
- ✅ Rate limiting em endpoints de autenticação
- ✅ Helmet para headers de segurança
- ✅ CORS configurável
- ✅ Validação de schemas com Zod
- ✅ Proteção de rotas por role

---

## ☁️ Deploy na AWS

### Backend (EC2)
```bash
# Build
cd backend
npm install --production
npm run db:migrate
npm start
```

### Banco de Dados (RDS)
- Crie instância PostgreSQL no RDS
- Atualize `DATABASE_URL` no `.env`

### Uploads (S3)
- Configure credenciais AWS no `.env`
- O código já está preparado para integração com S3

### Frontend
```bash
cd frontend
npm run build
# Distribua a pasta `dist` via S3 + CloudFront ou Vercel/Netlify
```

---

## 📋 API Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | /api/auth/register | Cadastro |
| POST | /api/auth/login | Login |
| GET | /api/auth/me | Perfil |
| GET | /api/cities | Listar cidades |
| GET | /api/cities/:slug | Detalhe cidade |
| POST | /api/cities | Criar cidade (Admin/Editor) |
| GET | /api/articles | Listar artigos |
| GET | /api/articles/:slug | Detalhe artigo |
| POST | /api/articles | Criar artigo (Admin/Editor) |
| POST | /api/newsletter/subscribe | Inscrever newsletter |
| GET | /api/settings/dashboard | Estatísticas (Admin) |

---

## 🎨 Design System

| Token | Valor | Uso |
|-------|-------|-----|
| Primary | `#0B2E4F` | Marca principal |
| Secondary | `#F4A261` | Destaques, CTAs |
| Accent | `#2A9D8F` | Complementar |
| Font Display | Playfair Display | Títulos |
| Font Body | Inter | Corpo de texto |

---

## 📄 Licença

Projeto desenvolvido para o **Portal da Rota Bioceânica**.

---

**Desenvolvido com 💙 para conectar a América do Sul.**
