# Sistema de Tradução — Como Implementar no RotaBio

## Contexto

O sistema atual (i18next + react-i18next) está instalado mas NÃO FUNCIONA.

A solução é substituí-lo pela abordagem do projeto MasterFisher, que é mais
simples, sem dependências externas e está em produção funcionando perfeitamente.
Este documento é um guia passo a passo para replicar exatamente o que foi feito lá.

---

## Como Funciona no MasterFisher (a referência que funciona)

São 3 arquivos e um padrão de uso. Nada mais.

```
src/
└── contexts/
    └── LanguageContext.tsx   ← tudo em um só lugar: estado, lógica e strings
```

### O LanguageContext

É um Context React padrão que faz 3 coisas:

**1. Guarda o idioma atual e persiste no localStorage**
```tsx
const [language, setLanguageState] = useState<Language>(() => {
  const saved = localStorage.getItem('language');
  return (saved as Language) || 'pt-BR'; // padrão: português
});

useEffect(() => {
  localStorage.setItem('language', language); // salva quando muda
}, [language]);
```

**2. Expõe a função `t(chave)` que resolve strings por notação de ponto**
```tsx
const t = (key: string): string => {
  const keys = key.split('.');               // 'nav.home' → ['nav', 'home']
  let value: any = translations[language];   // pega o objeto do idioma ativo
  for (const k of keys) {
    value = value?.[k];                      // navega pelo objeto
  }
  return value || key; // se não achar, devolve a chave — nunca quebra
};
```

**3. O objeto `translations` fica no mesmo arquivo**, com os 3 idiomas:
```tsx
const translations = {
  'pt-BR': {
    nav: { home: 'Início', cities: 'Destinos', ... },
    hero: { title: 'A Ponte Entre', ... },
  },
  'en-US': {
    nav: { home: 'Home', cities: 'Destinations', ... },
    hero: { title: 'The Bridge Between', ... },
  },
  'es-ES': {
    nav: { home: 'Inicio', cities: 'Destinos', ... },
    hero: { title: 'El Puente Entre', ... },
  },
};
```

---

## Passo a Passo para Implementar no RotaBio

### Passo 1 — Criar o LanguageContext

Criar o arquivo `src/contexts/LanguageContext.jsx` com este conteúdo
(adaptar os namespaces e strings para os do RotaBio):

```jsx
import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext(undefined);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('language') || 'pt-BR';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang) => setLanguageState(lang);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};

// ─────────────────────────────────────────────
// TODAS AS STRINGS DOS 3 IDIOMAS AQUI EMBAIXO
// ─────────────────────────────────────────────
const translations = {
  'pt-BR': {
    nav: {
      home: 'Início',
      cities: 'Destinos',
      news: 'Notícias',
      support: 'Apoie',
      supportMobile: 'Apoie o projeto',
      login: 'Entrar',
      logout: 'Sair',
    },
    hero: {
      badge: 'Rota Bioceânica · 4 Países · 3.500 km',
      titleLine1: 'A PONTE ENTRE',
      description: 'Do Pantanal ao Pacífico — a maior integração continental da América do Sul.',
      ctaPrimary: 'Explorar Cidades',
      ctaSecondary: 'Conheça a Rota',
    },
    // ... adicionar os demais namespaces do projeto
  },
  'en-US': {
    nav: {
      home: 'Home',
      cities: 'Destinations',
      news: 'News',
      support: 'Support',
      supportMobile: 'Support the project',
      login: 'Sign In',
      logout: 'Sign Out',
    },
    hero: {
      badge: 'Bioceanic Route · 4 Countries · 3,500 km',
      titleLine1: 'THE BRIDGE BETWEEN',
      description: 'From the Pantanal to the Pacific — the greatest continental integration in South America.',
      ctaPrimary: 'Explore Cities',
      ctaSecondary: 'Know the Route',
    },
    // ...
  },
  'es-ES': {
    nav: {
      home: 'Inicio',
      cities: 'Destinos',
      news: 'Noticias',
      support: 'Apoya',
      supportMobile: 'Apoya el proyecto',
      login: 'Entrar',
      logout: 'Salir',
    },
    hero: {
      badge: 'Ruta Bioceánica · 4 Países · 3.500 km',
      titleLine1: 'EL PUENTE ENTRE',
      description: 'Del Pantanal al Pacífico — la mayor integración continental de América del Sur.',
      ctaPrimary: 'Explorar Ciudades',
      ctaSecondary: 'Conoce la Ruta',
    },
    // ...
  },
};
```

### Passo 2 — Envolver o App com o Provider

Em `src/main.jsx`, REMOVER a importação do i18next e ADICIONAR o LanguageProvider:

```jsx
// REMOVER esta linha:
// import './i18n/index.js';

// O App.jsx ou main.jsx deve ter:
import { LanguageProvider } from './contexts/LanguageContext';

<LanguageProvider>
  <App />
</LanguageProvider>
```

### Passo 3 — Criar o seletor de idioma na Navbar

Substituir o `LangSwitcher` atual pelo que usa `useLanguage`:

```jsx
import { useLanguage } from '../contexts/LanguageContext';

const LANG_FLAGS = { 'pt-BR': '🇧🇷', 'en-US': '🇬🇧', 'es-ES': '🇪🇸' };

function LangSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {['pt-BR', 'en-US', 'es-ES'].map(lang => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          style={{
            background: language === lang ? 'rgba(255,255,255,0.15)' : 'transparent',
            border: 'none',
            borderRadius: '5px',
            padding: '4px 7px',
            color: language === lang ? '#fff' : 'rgba(255,255,255,0.4)',
            cursor: 'pointer',
          }}
        >
          {LANG_FLAGS[lang]}
        </button>
      ))}
    </div>
  );
}
```

### Passo 4 — Usar nos componentes

Substituir `useTranslation` por `useLanguage` em todos os componentes:

```jsx
// ANTES (i18next — quebrado):
import { useTranslation } from 'react-i18next';
const { t } = useTranslation();

// DEPOIS (LanguageContext — funciona):
import { useLanguage } from '../contexts/LanguageContext';
const { t } = useLanguage();

// O uso do t() é idêntico nos dois casos:
{t('nav.home')}
{t('hero.titleLine1')}
{t('hero.ctaPrimary')}
```

---

## O Que Muda em Relação ao Sistema Atual

| | i18next (atual, quebrado) | LanguageContext (MasterFisher, funciona) |
|--|--------------------------|------------------------------------------|
| Dependências | i18next, react-i18next, i18next-browser-languagedetector | Nenhuma — só React |
| Strings | 3 arquivos JSON separados | 1 objeto no próprio Context |
| Hook de uso | `useTranslation()` | `useLanguage()` |
| Função de tradução | `t('chave')` | `t('chave')` — idêntico |
| Persistência | localStorage via plugin | localStorage nativo |
| Roteamento por URL | `/en/`, `/es/` | Não usa — só estado |
| Complexidade | Alta | Mínima |

A troca de idioma por URL (`/en/cidades`) pode ser removida — não é necessária
para funcionar. O idioma fica salvo no localStorage e persiste entre sessões.

---

## Resumo

1. Criar `src/contexts/LanguageContext.jsx` com Provider + hook + objeto de traduções
2. Remover import do i18next no `main.jsx`, adicionar `<LanguageProvider>`
3. Trocar `useTranslation()` por `useLanguage()` em cada componente
4. Trocar `import { useTranslation } from 'react-i18next'` por `import { useLanguage } from '../contexts/LanguageContext'`
5. Mover as strings dos JSONs para dentro do objeto `translations` no Context

O `t('chave.subchave')` funciona igual — não precisa mudar nenhum texto nos templates.
