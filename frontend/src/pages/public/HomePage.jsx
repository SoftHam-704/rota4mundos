import HeroSection from "../../components/HeroSection.jsx";
import CitiesSection from "../../components/CitiesSection.jsx";
import ArticlesSection from "../../components/ArticlesSection.jsx";
import NewsletterSection from "../../components/NewsletterSection.jsx";
import InvestmentSection from "../../components/InvestmentSection.jsx";

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <InvestmentSection />
            <CitiesSection />
            <ArticlesSection />
            <NewsletterSection />
        </>
    );
}
