import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, Loader2, RotateCcw } from "lucide-react";
import { chatApi } from "../api/chat.js";

const WELCOME = {
    role: "assistant",
    content: "Olá! Sou o **Assistente Bioceânico** 🌊\n\nPosso te ajudar com informações sobre a Rota 4 Mundos — cidades, turismo, logística, a ponte histórica e muito mais.\n\nO que você gostaria de saber?",
};

function parseMarkdown(text) {
    return text
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        .replace(/\n/g, "<br/>");
}

const SUGGESTIONS = [
    "Como é a travessia pelo Chaco?",
    "O que fazer em Bonito?",
    "Quando a ponte vai ficar pronta?",
    "Qual o impacto econômico da rota?",
];

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([WELCOME]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const [unread, setUnread] = useState(0);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (open) {
            setUnread(0);
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [open]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    async function handleSend(text) {
        const msg = (text ?? input).trim();
        if (!msg || loading) return;

        setInput("");
        setShowSuggestions(false);
        const userMsg = { role: "user", content: msg };
        const nextMessages = [...messages, userMsg];
        setMessages(nextMessages);
        setLoading(true);

        try {
            const apiMessages = nextMessages
                .filter(m => m.role !== "system")
                .map(m => ({ role: m.role, content: m.content }));

            const res = await chatApi.sendMessage(apiMessages);
            const reply = res.data?.data?.reply ?? "Não consegui processar sua mensagem.";
            setMessages(prev => [...prev, { role: "assistant", content: reply }]);
        } catch (err) {
            const status = err?.response?.status;
            const errMsg = status === 429
                ? "Limite de mensagens atingido. Aguarde 15 minutos. ⏳"
                : "Serviço temporariamente indisponível. Tente novamente em instantes.";
            setMessages(prev => [...prev, { role: "assistant", content: errMsg, isError: true }]);
        } finally {
            setLoading(false);
        }
    }

    function handleReset() {
        setMessages([WELCOME]);
        setShowSuggestions(true);
        setInput("");
    }

    function handleKey(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    }

    return (
        <>
            {/* Floating button */}
            <div style={{ position: "fixed", bottom: "28px", right: "28px", zIndex: 999 }}>
                <AnimatePresence>
                    {!open && unread > 0 && (
                        <motion.div
                            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                            style={{
                                position: "absolute", top: "-6px", right: "-6px",
                                width: "20px", height: "20px", borderRadius: "50%",
                                background: "#F4A261", display: "flex",
                                alignItems: "center", justifyContent: "center",
                                fontSize: "10px", fontWeight: 800, color: "#061B33",
                                fontFamily: "Inter, sans-serif", zIndex: 2,
                            }}
                        >
                            {unread}
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    onClick={() => setOpen(o => !o)}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        width: "56px", height: "56px", borderRadius: "50%",
                        background: open
                            ? "rgba(6,27,51,0.9)"
                            : "linear-gradient(135deg, #2A9D8F, #1a6b63)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        boxShadow: open
                            ? "0 4px 24px rgba(0,0,0,0.4)"
                            : "0 8px 32px rgba(42,157,143,0.45)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", backdropFilter: "blur(12px)",
                        transition: "all 0.3s ease",
                    }}
                >
                    <AnimatePresence mode="wait">
                        {open
                            ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                <X size={22} color="#fff" />
                              </motion.div>
                            : <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                <MessageCircle size={22} color="#fff" />
                              </motion.div>
                        }
                    </AnimatePresence>
                </motion.button>
            </div>

            {/* Chat panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 20 }}
                        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                        style={{
                            position: "fixed", bottom: "96px", right: "28px",
                            width: "360px", height: "520px",
                            background: "rgba(4,18,38,0.97)",
                            backdropFilter: "blur(24px)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "20px",
                            boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
                            display: "flex", flexDirection: "column",
                            overflow: "hidden", zIndex: 998,
                            fontFamily: "Inter, sans-serif",
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            padding: "16px 18px",
                            borderBottom: "1px solid rgba(255,255,255,0.07)",
                            background: "rgba(42,157,143,0.08)",
                            display: "flex", alignItems: "center", gap: "10px",
                            flexShrink: 0,
                        }}>
                            <div style={{
                                width: "36px", height: "36px", borderRadius: "50%",
                                background: "linear-gradient(135deg, #2A9D8F22, #2A9D8F44)",
                                border: "1px solid rgba(42,157,143,0.4)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                flexShrink: 0,
                            }}>
                                <Bot size={18} color="#2A9D8F" />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>
                                    Assistente Bioceânico
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "2px" }}>
                                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e" }} />
                                    <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)" }}>Online · IA</span>
                                </div>
                            </div>
                            <button
                                onClick={handleReset}
                                title="Nova conversa"
                                style={{
                                    background: "none", border: "none", cursor: "pointer",
                                    padding: "4px", borderRadius: "6px",
                                    color: "rgba(255,255,255,0.3)",
                                    transition: "color 0.2s",
                                }}
                                onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
                                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}
                            >
                                <RotateCcw size={14} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div style={{
                            flex: 1, overflowY: "auto", padding: "16px",
                            display: "flex", flexDirection: "column", gap: "12px",
                            scrollbarWidth: "thin",
                            scrollbarColor: "rgba(255,255,255,0.1) transparent",
                        }}>
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                    style={{
                                        display: "flex",
                                        justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                                    }}
                                >
                                    {msg.role === "assistant" && (
                                        <div style={{
                                            width: "24px", height: "24px", borderRadius: "50%",
                                            background: "rgba(42,157,143,0.2)",
                                            border: "1px solid rgba(42,157,143,0.3)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            flexShrink: 0, marginRight: "8px", alignSelf: "flex-end",
                                        }}>
                                            <Bot size={12} color="#2A9D8F" />
                                        </div>
                                    )}
                                    <div style={{
                                        maxWidth: "78%",
                                        padding: "10px 13px",
                                        borderRadius: msg.role === "user"
                                            ? "14px 14px 4px 14px"
                                            : "14px 14px 14px 4px",
                                        background: msg.role === "user"
                                            ? "linear-gradient(135deg, #F4A261, #E9C46A)"
                                            : msg.isError
                                                ? "rgba(239,68,68,0.12)"
                                                : "rgba(255,255,255,0.06)",
                                        border: msg.role === "user"
                                            ? "none"
                                            : msg.isError
                                                ? "1px solid rgba(239,68,68,0.25)"
                                                : "1px solid rgba(255,255,255,0.08)",
                                        fontSize: "13px",
                                        lineHeight: 1.6,
                                        color: msg.role === "user" ? "#061B33" : "rgba(255,255,255,0.85)",
                                        fontWeight: msg.role === "user" ? 600 : 400,
                                    }}
                                        dangerouslySetInnerHTML={{
                                            __html: parseMarkdown(msg.content),
                                        }}
                                    />
                                </motion.div>
                            ))}

                            {/* Typing indicator */}
                            {loading && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                    style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}
                                >
                                    <div style={{
                                        width: "24px", height: "24px", borderRadius: "50%",
                                        background: "rgba(42,157,143,0.2)",
                                        border: "1px solid rgba(42,157,143,0.3)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        flexShrink: 0,
                                    }}>
                                        <Bot size={12} color="#2A9D8F" />
                                    </div>
                                    <div style={{
                                        padding: "10px 14px", borderRadius: "14px 14px 14px 4px",
                                        background: "rgba(255,255,255,0.06)",
                                        border: "1px solid rgba(255,255,255,0.08)",
                                        display: "flex", gap: "4px", alignItems: "center",
                                    }}>
                                        {[0, 1, 2].map(dot => (
                                            <motion.div
                                                key={dot}
                                                animate={{ opacity: [0.3, 1, 0.3] }}
                                                transition={{ duration: 1.2, repeat: Infinity, delay: dot * 0.2 }}
                                                style={{
                                                    width: "6px", height: "6px", borderRadius: "50%",
                                                    background: "rgba(42,157,143,0.8)",
                                                }}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Suggestions */}
                        <AnimatePresence>
                            {showSuggestions && messages.length === 1 && (
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    style={{
                                        padding: "0 12px 10px",
                                        display: "flex", flexWrap: "wrap", gap: "6px",
                                    }}
                                >
                                    {SUGGESTIONS.map(s => (
                                        <button
                                            key={s}
                                            onClick={() => handleSend(s)}
                                            style={{
                                                fontSize: "11px", padding: "5px 10px",
                                                borderRadius: "100px", cursor: "pointer",
                                                background: "rgba(42,157,143,0.1)",
                                                border: "1px solid rgba(42,157,143,0.25)",
                                                color: "rgba(255,255,255,0.6)",
                                                fontFamily: "Inter, sans-serif",
                                                transition: "all 0.2s",
                                                lineHeight: 1.3,
                                            }}
                                            onMouseEnter={e => {
                                                e.currentTarget.style.background = "rgba(42,157,143,0.2)";
                                                e.currentTarget.style.color = "#fff";
                                            }}
                                            onMouseLeave={e => {
                                                e.currentTarget.style.background = "rgba(42,157,143,0.1)";
                                                e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                                            }}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Input */}
                        <div style={{
                            padding: "12px",
                            borderTop: "1px solid rgba(255,255,255,0.07)",
                            flexShrink: 0,
                        }}>
                            <div style={{
                                display: "flex", gap: "8px", alignItems: "flex-end",
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: "14px", padding: "10px 12px",
                                transition: "border-color 0.2s",
                            }}
                                onFocus={e => e.currentTarget.style.borderColor = "rgba(42,157,143,0.4)"}
                                onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                            >
                                <textarea
                                    ref={inputRef}
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    onKeyDown={handleKey}
                                    placeholder="Pergunte sobre a rota..."
                                    rows={1}
                                    style={{
                                        flex: 1, background: "none", border: "none", outline: "none",
                                        resize: "none", fontSize: "13px",
                                        color: "rgba(255,255,255,0.85)",
                                        fontFamily: "Inter, sans-serif",
                                        lineHeight: 1.5, maxHeight: "80px",
                                        scrollbarWidth: "none",
                                    }}
                                    onInput={e => {
                                        e.target.style.height = "auto";
                                        e.target.style.height = `${Math.min(e.target.scrollHeight, 80)}px`;
                                    }}
                                />
                                <button
                                    onClick={() => handleSend()}
                                    disabled={!input.trim() || loading}
                                    style={{
                                        width: "32px", height: "32px", borderRadius: "10px",
                                        background: input.trim() && !loading
                                            ? "linear-gradient(135deg, #2A9D8F, #1a6b63)"
                                            : "rgba(255,255,255,0.06)",
                                        border: "none", cursor: input.trim() && !loading ? "pointer" : "default",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        flexShrink: 0, transition: "all 0.2s",
                                    }}
                                >
                                    {loading
                                        ? <Loader2 size={14} color="rgba(255,255,255,0.4)" style={{ animation: "spin 1s linear infinite" }} />
                                        : <Send size={14} color={input.trim() ? "#fff" : "rgba(255,255,255,0.25)"} />
                                    }
                                </button>
                            </div>
                            <p style={{
                                fontSize: "9px", color: "rgba(255,255,255,0.2)",
                                textAlign: "center", marginTop: "6px",
                                fontFamily: "Inter, sans-serif",
                            }}>
                                IA pode cometer erros · Powered by OpenAI / Gemini
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                @media (max-width: 480px) {
                    .chat-panel { width: calc(100vw - 32px) !important; right: 16px !important; }
                }
            `}</style>
        </>
    );
}
