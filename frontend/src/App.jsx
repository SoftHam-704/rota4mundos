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
import MariscalEstigarribiaPage from "./pages/public/MariscalEstigarribiaPage.jsx";
import FiladelfiePage from "./pages/public/FiladelfiePage.jsx";
import SaltaPage from "./pages/public/SaltaPage.jsx";
import JujuyPage from "./pages/public/JujuyPage.jsx";
import TartagalPage from "./pages/public/TartagalPage.jsx";
import AntofagastaPage from "./pages/public/AntofagastaPage.jsx";
import IquiquePage from "./pages/public/IquiquePage.jsx";
import MejillonesPage from "./pages/public/MejillonesPage.jsx";
import ArticlesPage from "./pages/public/ArticlesPage.jsx";
import ArticleDetailPage from "./pages/public/ArticleDetailPage.jsx";
import LoginPage from "./pages/public/LoginPage.jsx";
import RegisterPage from "./pages/public/RegisterPage.jsx";
import ApoiePage from "./pages/public/ApoiePage.jsx";
import ColaborePage from "./pages/public/ColaborePage.jsx";

import DashboardPage from "./pages/admin/DashboardPage.jsx";
import AdminCitiesPage from "./pages/admin/AdminCitiesPage.jsx";
import AdminArticlesPage from "./pages/admin/AdminArticlesPage.jsx";
import AdminNewsletterPage from "./pages/admin/AdminNewsletterPage.jsx";
import AdminPublicationsPage from "./pages/admin/AdminPublicationsPage.jsx";
import AdminContributionsPage from "./pages/admin/AdminContributionsPage.jsx";

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
                <Route path="/login"    element={<LoginPage />} />
                <Route path="/registro" element={<RegisterPage />} />
            </Route>

            {/* ES / EN — mesmas páginas com prefixo /:lang */}
            <Route path="/:lang" element={<LangWrapper />}>
                <Route element={<PublicLayout />}>
                    <Route index element={<HomePage />} />
                    {SHARED_ROUTES.map(r => (
                        <Route key={r.path} path={r.path} element={r.el} />
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
            </Route>
        </Routes>
        </>
    );
}

export default App;
