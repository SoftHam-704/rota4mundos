import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Globe, Lock, Mail, User, Check } from "lucide-react";
import { useAuthStore } from "../../stores/authStore.js";
import toast from "react-hot-toast";

const RULES = [
    { id: "len",   label: "Mínimo 8 caracteres",  test: (p) => p.length >= 8 },
    { id: "upper", label: "Uma letra maiúscula",   test: (p) => /[A-Z]/.test(p) },
    { id: "lower", label: "Uma letra minúscula",   test: (p) => /[a-z]/.test(p) },
    { id: "num",   label: "Um número",             test: (p) => /[0-9]/.test(p) },
];

export default function RegisterPage() {
    const navigate  = useNavigate();
    const { register, isLoading } = useAuthStore();

    const [showPassword, setShowPassword]        = useState(false);
    const [showConfirm,  setShowConfirm]          = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });

    const set = (field) => (e) => setFormData((prev) => ({ ...prev, [field]: e.target.value }));

    const passing     = RULES.filter((r) => r.test(formData.password));
    const allRules    = passing.length === RULES.length;
    const pwdTouched  = formData.password.length > 0;
    const confirmMatch = formData.password === formData.confirmPassword && formData.confirmPassword.length > 0;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!allRules) {
            const failing = RULES.filter((r) => !r.test(formData.password)).map((r) => r.label.toLowerCase());
            toast.error(`A senha precisa ter: ${failing.join(", ")}`);
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            toast.error("As senhas não coincidem");
            return;
        }

        const { confirmPassword, ...payload } = formData;
        const result = await register(payload);
        if (result.success) {
            toast.success("Conta criada com sucesso!");
            navigate("/");
        } else {
            toast.error(result.error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 relative overflow-hidden py-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md mx-4">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-400 flex items-center justify-center mx-auto mb-4">
                            <Globe className="w-7 h-7 text-white" />
                        </div>
                        <h1 className="font-display text-2xl font-bold text-white">Criar conta</h1>
                        <p className="text-white/60 mt-1">Junte-se à comunidade da Rota Bioceânica</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Nome */}
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">Nome completo</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                <input
                                    type="text" required value={formData.name} onChange={set("name")}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-secondary-400/50 transition-colors"
                                    placeholder="Seu nome"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                <input
                                    type="email" required value={formData.email} onChange={set("email")}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-secondary-400/50 transition-colors"
                                    placeholder="seu@email.com"
                                />
                            </div>
                        </div>

                        {/* Senha */}
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">Senha</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                <input
                                    type={showPassword ? "text" : "password"} required value={formData.password} onChange={set("password")}
                                    className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-secondary-400/50 transition-colors"
                                    placeholder="Crie uma senha segura"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70">
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>

                            {/* indicadores de força */}
                            {pwdTouched && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="mt-3 grid grid-cols-2 gap-1.5"
                                >
                                    {RULES.map((rule) => {
                                        const ok = rule.test(formData.password);
                                        return (
                                            <div key={rule.id} className={`flex items-center gap-1.5 text-xs transition-colors ${ok ? "text-green-400" : "text-white/35"}`}>
                                                <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${ok ? "bg-green-400" : "bg-white/15"}`}>
                                                    {ok && <Check className="w-2 h-2 text-white" strokeWidth={3} />}
                                                </div>
                                                {rule.label}
                                            </div>
                                        );
                                    })}
                                </motion.div>
                            )}
                        </div>

                        {/* Confirmar senha */}
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">Confirmar senha</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                <input
                                    type={showConfirm ? "text" : "password"} required value={formData.confirmPassword} onChange={set("confirmPassword")}
                                    className={`w-full pl-12 pr-12 py-3 rounded-xl bg-white/10 border text-white placeholder:text-white/40 focus:outline-none transition-colors ${
                                        formData.confirmPassword.length > 0
                                            ? confirmMatch
                                                ? "border-green-400/50 focus:border-green-400/70"
                                                : "border-red-400/50 focus:border-red-400/70"
                                            : "border-white/20 focus:border-secondary-400/50"
                                    }`}
                                    placeholder="Repita a senha"
                                />
                                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70">
                                    {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {formData.confirmPassword.length > 0 && !confirmMatch && (
                                <p className="mt-1.5 text-xs text-red-400">As senhas não coincidem</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || !allRules || !confirmMatch}
                            className="w-full py-3.5 rounded-xl bg-secondary-500 text-primary-900 font-bold hover:bg-secondary-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Criando conta..." : "Criar conta"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-white/60 text-sm">
                            Já tem conta?{" "}
                            <Link to="/login" className="text-secondary-400 hover:text-secondary-300 font-medium">Entrar</Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
