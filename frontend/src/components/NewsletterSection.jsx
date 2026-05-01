import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

export default function NewsletterSection() {
    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !email.includes("@")) {
            toast.error("Por favor, insira um email válido");
            return;
        }
        setIsSubmitted(true);
        toast.success(t("newsletter.success"));
        setEmail("");
    };

    return (
        <section className="py-20 bg-gradient-to-br from-primary-900 to-primary-800 relative overflow-hidden">
            {/* Elementos decorativos */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            <div className="container-custom relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto text-center"
                >
                    <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
                        <Send className="w-8 h-8 text-secondary-400" />
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                        {t("newsletter.title")}
                    </h2>
                    <p className="text-lg text-white/70 mb-8">{t("newsletter.description")}</p>

                    {isSubmitted ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex items-center justify-center gap-3 text-white"
                        >
                            <CheckCircle className="w-6 h-6 text-secondary-400" />
                            <span className="text-lg">{t("newsletter.success")}</span>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t("newsletter.placeholder")}
                                className="flex-1 px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-secondary-400/50 transition-colors"
                            />
                            <button type="submit" className="btn-secondary px-6 py-3.5">
                                {t("newsletter.button")}
                            </button>
                        </form>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
