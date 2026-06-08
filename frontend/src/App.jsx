import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";
import ChatWidget from "./components/ChatWidget.jsx";
import LangWrapper from "./components/LangWrapper.jsx";
import { useAuthStore } from "./stores/authStore.js";
import { usePageView } from "./hooks/usePageView.js";

import PublicLayout from "./layouts/PublicLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";

import HomePage from "./pages/public/HomePage.jsx";
import CitiesPage from "./pages/public/CitiesPage.jsx";
import CityDetailPage from "./pages/public/CityDetailPage.jsx";
import PortoMurtinhoPage from "./pages/public/PortoMurtinhoPage.jsx";
import CampoGrandePage from "./pages/public/CampoGrandePage.jsx";
import BonitoPage from "./pages/public/BonitoPage.jsx";
import JardimPage from "./pages/public/JardimPage.jsx";
import SidrolandiaPage from "./pages/public/SidrolandiaPage.jsx";
import CarmeloPeraltaPage from "./pages/public/CarmeloPeraltaPage.jsx";
import CarmeloPeraltaPageEs from "./pages/public/CarmeloPeraltaPage_es.jsx";
import MariscalEstigarribiaPage from "./pages/public/MariscalEstigarribiaPage.jsx";
import MariscalEstigarribiaPageEs from "./pages/public/MariscalEstigarribiaPage_es.jsx";
import FiladelfiePage from "./pages/public/FiladelfiePage.jsx";
import FiladelfiPageEs from "./pages/public/FiladelfiePage_es.jsx";
import SaltaPage from "./pages/public/SaltaPage.jsx";
import SaltaPageEs from "./pages/public/SaltaPage_es.jsx";
import JujuyPage from "./pages/public/JujuyPage.jsx";
import JujuyPageEs from "./pages/public/JujuyPage_es.jsx";
import TartagalPage from "./pages/public/TartagalPage.jsx";
import TartagalPageEs from "./pages/public/TartagalPage_es.jsx";
import AntofagastaPage from "./pages/public/AntofagastaPage.jsx";
import AntofagastaPageEs from "./pages/public/AntofagastaPage_es.jsx";
import IquiquePage from "./pages/public/IquiquePage.jsx";
import IquiquePageEs from "./pages/public/IquiquePage_es.jsx";
import MejillonesPage from "./pages/public/MejillonesPage.jsx";
import MejillonesPageEs from "./pages/public/MejillonesPage_es.jsx";
import CampoGrandePageEs from "./pages/public/CampoGrandePage_es.jsx";
import PortoMurtinhoPageEs from "./pages/public/PortoMurtinhoPage_es.jsx";
import BonitoPageEs from "./pages/public/BonitoPage_es.jsx";
import JardimPageEs from "./pages/public/JardimPage_es.jsx";
import SidrolandiaPageEs from "./pages/public/SidrolandiaPage_es.jsx";
import CampoGrandePageEn from "./pages/public/CampoGrandePage_en.jsx";
import PortoMurtinhoPageEn from "./pages/public/PortoMurtinhoPage_en.jsx";
import BonitoPageEn from "./pages/public/BonitoPage_en.jsx";
import JardimPageEn from "./pages/public/JardimPage_en.jsx";
import SidrolandiaPageEn from "./pages/public/SidrolandiaPage_en.jsx";
import CarmeloPeraltaPageEn from "./pages/public/CarmeloPeraltaPage_en.jsx";
import MariscalEstigarribiaPageEn from "./pages/public/MariscalEstigarribiaPage_en.jsx";
import FiladelfiPageEn from "./pages/public/FiladelfiePage_en.jsx";
import SaltaPageEn from "./pages/public/SaltaPage_en.jsx";
import JujuyPageEn from "./pages/public/JujuyPage_en.jsx";
import TartagalPageEn from "./pages/public/TartagalPage_en.jsx";
import AntofagastaPageEn from "./pages/public/AntofagastaPage_en.jsx";
import IquiquePageEn from "./pages/public/IquiquePage_en.jsx";
import MejillonesPageEn from "./pages/public/MejillonesPage_en.jsx";
import ArticlesPage from "./pages/public/ArticlesPage.jsx";
import ArticleDetailPage from "./pages/public/ArticleDetailPage.jsx";
import LoginPage from "./pages/public/LoginPage.jsx";
import RegisterPage from "./pages/public/RegisterPage.jsx";
import ApoiePage from "./pages/public/ApoiePage.jsx";
import ColaborePage from "./pages/public/ColaborePage.jsx";
import MinhaContaPage from "./pages/public/MinhaContaPage.jsx";

import DashboardPage from "./pages/admin/DashboardPage.jsx";
import AdminCitiesPage from "./pages/admin/AdminCitiesPage.jsx";
import AdminArticlesPage from "./pages/admin/AdminArticlesPage.jsx";
import AdminNewsletterPage from "./pages/admin/AdminNewsletterPage.jsx";
import AdminPublicationsPage from "./pages/admin/AdminPublicationsPage.jsx";
import AdminContributionsPage from "./pages/admin/AdminContributionsPage.jsx";
import AdminUsersPage from "./pages/admin/AdminUsersPage.jsx";

// Rotas de cidades e páginas públicas (reutilizadas para PT e /:lang)
const SHARED_ROUTES = [
    { path: "cidades",                          el: <CitiesPage /> },
    { path: "cidades/porto-murtinho",           el: <PortoMurtinhoPage /> },
    { path: "cidades/campo-grande",             el: <CampoGrandePage /> },
    { path: "cidades/bonito",                   el: <BonitoPage /> },
    { path: "cidades/sidrolandia",              el: <SidrolandiaPage /> },
    { path: "cidades/jardim",                   el: <JardimPage /> },
    { path: "cidades/carmelo-peralta",          el: <CarmeloPeraltaPage /> },
    { path: "cidades/mariscal-estigarribia",    el: <MariscalEstigarribiaPage /> },
    { path: "cidades/filadelfia",               el: <FiladelfiePage /> },
    { path: "cidades/salta",                    el: <SaltaPage /> },
    { path: "cidades/jujuy",                    el: <JujuyPage /> },
    { path: "cidades/tartagal",                 el: <TartagalPage /> },
    { path: "cidades/antofagasta",              el: <AntofagastaPage /> },
    { path: "cidades/iquique",                  el: <IquiquePage /> },
    { path: "cidades/mejillones",               el: <MejillonesPage /> },
    { path: "cidades/:slug",                    el: <CityDetailPage /> },
    { path: "noticias",                         el: <ArticlesPage /> },
    { path: "noticias/:slug",                   el: <ArticleDetailPage /> },
    { path: "apoie",                            el: <ApoiePage /> },
    { path: "colabore",                         el: <ColaborePage /> },
];

// ES overrides — city pages with full Spanish translation
const ES_SHARED_ROUTES = SHARED_ROUTES.map(r => {
    if (r.path === "cidades/carmelo-peralta")       return { ...r, el: <CarmeloPeraltaPageEs /> };
    if (r.path === "cidades/mariscal-estigarribia") return { ...r, el: <MariscalEstigarribiaPageEs /> };
    if (r.path === "cidades/filadelfia")            return { ...r, el: <FiladelfiPageEs /> };
    if (r.path === "cidades/salta")                 return { ...r, el: <SaltaPageEs /> };
    if (r.path === "cidades/jujuy")                 return { ...r, el: <JujuyPageEs /> };
    if (r.path === "cidades/tartagal")              return { ...r, el: <TartagalPageEs /> };
    if (r.path === "cidades/antofagasta")           return { ...r, el: <AntofagastaPageEs /> };
    if (r.path === "cidades/iquique")               return { ...r, el: <IquiquePageEs /> };
    if (r.path === "cidades/mejillones")            return { ...r, el: <MejillonesPageEs /> };
    if (r.path === "cidades/campo-grande")          return { ...r, el: <CampoGrandePageEs /> };
    if (r.path === "cidades/porto-murtinho")        return { ...r, el: <PortoMurtinhoPageEs /> };
    if (r.path === "cidades/bonito")                return { ...r, el: <BonitoPageEs /> };
    if (r.path === "cidades/jardim")                return { ...r, el: <JardimPageEs /> };
    if (r.path === "cidades/sidrolandia")           return { ...r, el: <SidrolandiaPageEs /> };
    return r;
});

// EN overrides — city pages with full English translation
const EN_SHARED_ROUTES = SHARED_ROUTES.map(r => {
    if (r.path === "cidades/campo-grande")          return { ...r, el: <CampoGrandePageEn /> };
    if (r.path === "cidades/porto-murtinho")        return { ...r, el: <PortoMurtinhoPageEn /> };
    if (r.path === "cidades/bonito")                return { ...r, el: <BonitoPageEn /> };
    if (r.path === "cidades/jardim")                return { ...r, el: <JardimPageEn /> };
    if (r.path === "cidades/sidrolandia")           return { ...r, el: <SidrolandiaPageEn /> };
    if (r.path === "cidades/carmelo-peralta")       return { ...r, el: <CarmeloPeraltaPageEn /> };
    if (r.path === "cidades/mariscal-estigarribia") return { ...r, el: <MariscalEstigarribiaPageEn /> };
    if (r.path === "cidades/filadelfia")            return { ...r, el: <FiladelfiPageEn /> };
    if (r.path === "cidades/salta")                 return { ...r, el: <SaltaPageEn /> };
    if (r.path === "cidades/jujuy")                 return { ...r, el: <JujuyPageEn /> };
    if (r.path === "cidades/tartagal")              return { ...r, el: <TartagalPageEn /> };
    if (r.path === "cidades/antofagasta")           return { ...r, el: <AntofagastaPageEn /> };
    if (r.path === "cidades/iquique")               return { ...r, el: <IquiquePageEn /> };
    if (r.path === "cidades/mejillones")            return { ...r, el: <MejillonesPageEn /> };
    return r;
});

function App() {
    const { checkAuth } = useAuthStore();
    usePageView();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return (
        <>
        <ScrollToTop />
        <ChatWidget />
        <Routes>
            {/* PT — rotas canônicas sem prefixo */}
            <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                {SHARED_ROUTES.map(r => (
                    <Route key={r.path} path={r.path} element={r.el} />
                ))}
                <Route path="/login"       element={<LoginPage />} />
                <Route path="/registro"    element={<RegisterPage />} />
                <Route path="/minha-conta" element={<MinhaContaPage />} />
            </Route>

            {/* ES — rotas com páginas traduzidas para espanhol */}
            <Route path="/es" element={<LangWrapper />}>
                <Route element={<PublicLayout />}>
                    <Route index element={<HomePage />} />
                    {ES_SHARED_ROUTES.map(r => (
                        <Route key={`es-${r.path}`} path={r.path} element={r.el} />
                    ))}
                </Route>
            </Route>

            {/* EN — rotas com páginas traduzidas para inglês */}
            <Route path="/en" element={<LangWrapper />}>
                <Route element={<PublicLayout />}>
                    <Route index element={<HomePage />} />
                    {EN_SHARED_ROUTES.map(r => (
                        <Route key={`en-${r.path}`} path={r.path} element={r.el} />
                    ))}
                </Route>
            </Route>

            {/* Admin */}
            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="cidades"      element={<AdminCitiesPage />} />
                <Route path="artigos"      element={<AdminArticlesPage />} />
                <Route path="newsletter"   element={<AdminNewsletterPage />} />
                <Route path="publicacoes"  element={<AdminPublicationsPage />} />
                <Route path="colaboracoes" element={<AdminContributionsPage />} />
                <Route path="usuarios"     element={<AdminUsersPage />} />
            </Route>
        </Routes>
        </>
    );
}

export default App;
