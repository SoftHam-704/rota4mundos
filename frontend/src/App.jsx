import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { useAuthStore } from "./stores/authStore.js";

import PublicLayout from "./layouts/PublicLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";

import HomePage from "./pages/public/HomePage.jsx";
import CitiesPage from "./pages/public/CitiesPage.jsx";
import CityDetailPage from "./pages/public/CityDetailPage.jsx";
import PortoMurtinhoPage from "./pages/public/PortoMurtinhoPage.jsx";
import CampoGrandePage from "./pages/public/CampoGrandePage.jsx";
import BonitoPage from "./pages/public/BonitoPage.jsx";
import ArticlesPage from "./pages/public/ArticlesPage.jsx";
import ArticleDetailPage from "./pages/public/ArticleDetailPage.jsx";
import LoginPage from "./pages/public/LoginPage.jsx";
import RegisterPage from "./pages/public/RegisterPage.jsx";

import DashboardPage from "./pages/admin/DashboardPage.jsx";
import AdminCitiesPage from "./pages/admin/AdminCitiesPage.jsx";
import AdminArticlesPage from "./pages/admin/AdminArticlesPage.jsx";
import AdminNewsletterPage from "./pages/admin/AdminNewsletterPage.jsx";

function App() {
    const { checkAuth } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return (
        <>
        <ScrollToTop />
        <Routes>
            {/* Rotas públicas */}
            <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/cidades" element={<CitiesPage />} />
                <Route path="/cidades/porto-murtinho" element={<PortoMurtinhoPage />} />
                <Route path="/cidades/campo-grande" element={<CampoGrandePage />} />
                <Route path="/cidades/bonito" element={<BonitoPage />} />
                <Route path="/cidades/:slug" element={<CityDetailPage />} />
                <Route path="/noticias" element={<ArticlesPage />} />
                <Route path="/noticias/:slug" element={<ArticleDetailPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registro" element={<RegisterPage />} />
            </Route>

            {/* Rotas administrativas */}
            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="cidades" element={<AdminCitiesPage />} />
                <Route path="artigos" element={<AdminArticlesPage />} />
                <Route path="newsletter" element={<AdminNewsletterPage />} />
            </Route>
        </Routes>
        </>
    );
}

export default App;
