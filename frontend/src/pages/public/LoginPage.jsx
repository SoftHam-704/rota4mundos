import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Globe, Lock, Mail } from "lucide-react";
import { useAuthStore } from "../../stores/authStore.js";
import toast from "react-hot-toast";

export default function LoginPage() {
    const navigate = useNavigate();
    const { login, isLoading } = useAuthStore();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(formData);
        if (result.success) {
            toast.success("Login realizado com sucesso!");
            navigate("/");
        } else {
            toast.error(result.error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md mx-4"
            >
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-400 flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <Globe className="w-7 h-7 text-white" />
                        </div>
                        <h1 className="font-display text-2xl font-bold text-white">Bem-vindo de volta</h1>
                        <p className="text-white/60 mt-1">Acesse sua conta no Portal da Rota Bioceânica</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-secondary-400/50 transition-colors"
                                    placeholder="seu@email.com"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">Senha</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-secondary-400/50 transition-colors"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3.5 rounded-xl bg-secondary-500 text-primary-900 font-bold hover:bg-secondary-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Entrando..." : "Entrar"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-white/60 text-sm">
                            Não tem conta?{" "}
                            <Link to="/registro" className="text-secondary-400 hover:text-secondary-300 font-medium">Registre-se</Link>
                        </p>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/10">
                        <p className="text-center text-xs text-white/40 mb-3">Contas de demonstração</p>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                            <div className="bg-white/5 rounded-lg p-2 text-white/60">
                                <span className="block font-medium text-white/80">Admin</span>
                                admin@rotabio.com
                            </div>
                            <div className="bg-white/5 rounded-lg p-2 text-white/60">
                                <span className="block font-medium text-white/80">Editor</span>
                                editor@rotabio.com
                            </div>
                        </div>
                        <p className="text-center text-xs text-white/30 mt-2">Senha: admin@123 / editor@123</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
