import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Instagram, Facebook, CheckCircle, XCircle, Send, Edit3, Trash2, ExternalLink, RefreshCw, AlertTriangle, Sparkles, Clock, Copy, Download, Smartphone } from "lucide-react";
import { socialPostsApi } from "../../api/socialPosts.js";
import toast from "react-hot-toast";
import dayjs from "dayjs";

// Agente do Instagram: ele prepara arte + legenda revisada; aqui um humano aprova.
// Nada vai ao ar sem aprovação. Os aprovados saem às 12:00 e às 19:00.

const STATUS = {
    DRAFT:      { label: "Para aprovar", bg: "#FEF9C3", text: "#854D0E" },
    APPROVED:   { label: "Aprovado",     bg: "#DCFCE7", text: "#166534" },
    PUBLISHING: { label: "Publicando",   bg: "#DBEAFE", text: "#1E40AF" },
    PUBLISHED:  { label: "Publicado",    bg: "#F0FDF4", text: "#15803D" },
    FAILED:     { label: "Com erro",     bg: "#FEE2E2", text: "#991B1B" },
    REJECTED:   { label: "Rejeitado",    bg: "#F1F5F9", text: "#475569" },
};

const TIPO = { REPORTAGEM: "Reportagem", CIDADE: "Cidade da Rota", INFOGRAFICO: "Infográfico", PODCAST: "Podcast", HISTORIA: "História da Rota" };

const ABAS = [
    { key: "DRAFT", label: "Para aprovar" },
    { key: "APPROVED", label: "Na fila" },
    { key: "PUBLISHED", label: "Publicados" },
    { key: "FAILED", label: "Com erro" },
    { key: "REJECTED", label: "Rejeitados" },
    { key: "", label: "Todos" },
];

const erroDe = (err) => err.response?.data?.message || err.message || "Erro";

function PainelConta({ status, onGerar, gerando }) {
    if (!status) return null;
    const { conta, cota, erroConta, tokenRenovadoEm, porStatus = {} } = status;
    return (
        <div className={`rounded-2xl border p-5 mb-6 flex flex-wrap items-center gap-6 ${erroConta ? "border-red-200 bg-red-50" : "border-slate-200 bg-white"}`}>
            <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: "#FDF2F8" }}>
                    <Instagram className="w-6 h-6" style={{ color: "#BE185D" }} />
                </div>
                <div>
                    {conta ? (
                        <>
                            <div className="font-semibold text-primary-950">@{conta.username}</div>
                            <div className="text-xs text-slate-500">{conta.media_count} posts · {conta.followers_count} seguidores</div>
                        </>
                    ) : (
                        <div className="text-sm font-semibold text-red-700 flex items-center gap-1">
                            <AlertTriangle className="w-4 h-4" /> Instagram sem conexão
                        </div>
                    )}
                </div>
            </div>
            {erroConta && <div className="text-sm text-red-700 flex-1 min-w-[240px]">{erroConta}</div>}
            {!erroConta && (
                <div className="flex flex-wrap gap-6 text-sm text-slate-600">
                    <div><span className="text-slate-400">Cota da Meta hoje</span><br />{cota ? `${cota.usado} de ${cota.limite}` : "—"}</div>
                    <div><span className="text-slate-400">Publicação automática</span><br />12:00 e 19:00</div>
                    <div><span className="text-slate-400">Token renovado em</span><br />{tokenRenovadoEm ? dayjs(tokenRenovadoEm).format("DD/MM/YYYY") : "—"}</div>
                    <div><span className="text-slate-400">Para aprovar</span><br />{porStatus.DRAFT || 0}</div>
                    <div><span className="text-slate-400">Na fila</span><br />{porStatus.APPROVED || 0}</div>
                </div>
            )}
            <button onClick={onGerar} disabled={gerando} className="btn-primary ml-auto disabled:opacity-60">
                {gerando ? <RefreshCw className="w-5 h-5 mr-2 animate-spin" /> : <Sparkles className="w-5 h-5 mr-2" />}
                {gerando ? "Gerando rascunhos…" : "Gerar rascunhos agora"}
            </button>
        </div>
    );
}

// Página do Facebook: conectada uma vez pelo administrador (o Facebook pede login e autorização);
// depois, todo post publicado no Instagram sai também na Página, com o link do portal na legenda.
function PainelFacebook({ fb, onConectar, conectando }) {
    // sem o app da Meta configurado no servidor, o Facebook fica fora da tela (deixado de lado em 04/10/2026)
    if (!fb?.appConfigurado) return null;
    const { appConfigurado, conectado, pagina, erro } = fb;
    return (
        <div className={`rounded-2xl border p-5 mb-6 flex flex-wrap items-center gap-6 ${erro ? "border-red-200 bg-red-50" : "border-slate-200 bg-white"}`}>
            <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: "#EFF6FF" }}>
                    <Facebook className="w-6 h-6" style={{ color: "#1877F2" }} />
                </div>
                <div>
                    {conectado && pagina ? (
                        <>
                            <a href={pagina.link} target="_blank" rel="noreferrer" className="font-semibold text-primary-950 hover:underline">{pagina.nome}</a>
                            <div className="text-xs text-slate-500">{pagina.seguidores != null ? `${pagina.seguidores} seguidores · ` : ""}recebe tudo o que sai no Instagram</div>
                        </>
                    ) : (
                        <div className="text-sm font-semibold text-slate-700">Página do Facebook {erro ? "desconectada" : "não conectada"}</div>
                    )}
                </div>
            </div>
            {erro && <div className="text-sm text-red-700 flex-1 min-w-[240px]">{erro}</div>}
            {!appConfigurado && (
                <div className="text-sm text-amber-800 flex-1 min-w-[240px]">Falta configurar FB_APP_ID e FB_APP_SECRET no servidor.</div>
            )}
            {appConfigurado && (!conectado || erro) && (
                <button onClick={onConectar} disabled={conectando} className="ml-auto text-sm px-4 py-2 rounded-lg text-white flex items-center gap-2 disabled:opacity-60" style={{ background: "#1877F2" }}>
                    <Facebook className="w-4 h-4" /> {erro ? "Reconectar Facebook" : "Conectar Facebook"}
                </button>
            )}
        </div>
    );
}

// ── Postar pelo celular ─────────────────────────────────────────────────────────────────────────
// Ponte enquanto a conta nova da Meta não sai (06/10/2026): copiar a legenda, salvar a arte (no
// celular abre o menu de compartilhar, direto para o Instagram) e marcar "já postei à mão" — sem
// isso, quando o token voltar, o agendador repostaria o que já foi ao ar.
async function copiarLegenda(texto) {
    try { await navigator.clipboard.writeText(texto); toast.success("Legenda copiada"); }
    catch { toast.error("Não consegui copiar — selecione o texto e copie à mão"); }
}

async function salvarMidia(post) {
    const url = post.mediaType === "REEL" && post.videoUrl ? post.videoUrl : post.imageUrl;
    if (!url) return toast.error("Este post não tem arte");
    const ext = (url.split("?")[0].split(".").pop() || "jpg").toLowerCase();
    const nome = `rota4mundos-${dayjs(post.createdAt).format("YYYYMMDD-HHmm")}.${ext}`;
    try {
        const blob = await (await fetch(url)).blob();
        const arquivo = new File([blob], nome, { type: blob.type });
        // no celular: menu de compartilhar (Instagram aparece lá); no computador: download comum
        if (window.matchMedia("(pointer: coarse)").matches && navigator.canShare?.({ files: [arquivo] })) {
            await navigator.share({ files: [arquivo] });
            return;
        }
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = nome;
        a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 10000);
    } catch (e) {
        if (e?.name !== "AbortError") toast.error("Não consegui salvar a arte — abra a imagem e salve à mão");
    }
}

function CartaoPost({ post, acoes, ocupado }) {
    const [editando, setEditando] = useState(false);
    const [legenda, setLegenda] = useState(post.caption);
    const st = STATUS[post.status] || STATUS.DRAFT;
    const alerta = post.reviewNote?.startsWith("ATENÇÃO");
    const editavel = ["DRAFT", "FAILED", "REJECTED", "APPROVED"].includes(post.status);

    return (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col">
            {post.mediaType === "REEL" && post.videoUrl ? (
                <video src={post.videoUrl} poster={post.imageUrl || undefined} controls playsInline preload="metadata"
                    className="w-full bg-slate-900" style={{ aspectRatio: "9 / 16" }} />
            ) : post.imageUrl && (
                <a href={post.imageUrl} target="_blank" rel="noreferrer" className="block bg-slate-100" style={{ aspectRatio: "4 / 5" }}>
                    <img src={post.imageUrl} alt="" className="w-full h-full object-cover" loading="lazy" />
                </a>
            )}
            <div className="p-4 flex flex-col gap-3 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ background: st.bg, color: st.text }}>{st.label}</span>
                    {post.mediaType === "REEL" && <span className="text-xs font-semibold px-2 py-1 rounded-full bg-purple-100 text-purple-800">Reel · 19:00</span>}
                    {post.kind && <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600">{TIPO[post.kind]}</span>}
                    <span className="text-xs text-slate-400 ml-auto flex items-center gap-1"><Clock className="w-3 h-3" />{dayjs(post.createdAt).format("DD/MM HH:mm")}</span>
                </div>

                {post.errorMessage && (
                    <div className="text-sm rounded-lg bg-red-50 border border-red-200 text-red-800 p-3">
                        <strong>Erro na publicação:</strong> {post.errorMessage}
                    </div>
                )}
                {post.reviewNote && (
                    <div className={`text-xs rounded-lg p-3 whitespace-pre-line ${alerta ? "bg-amber-50 border border-amber-200 text-amber-900" : "bg-slate-50 text-slate-500"}`}>
                        {post.reviewNote}
                    </div>
                )}

                {editando ? (
                    <>
                        <textarea value={legenda} onChange={(e) => setLegenda(e.target.value)} rows={12}
                            className="w-full text-sm rounded-lg border border-slate-200 p-3 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20" />
                        <div className="text-xs text-slate-400 text-right">{legenda.length} / 2200</div>
                        <div className="flex gap-2">
                            <button disabled={ocupado} onClick={() => { acoes.editar(post.id, legenda); setEditando(false); }} className="btn-primary text-sm py-2">Salvar legenda</button>
                            <button onClick={() => { setLegenda(post.caption); setEditando(false); }} className="text-sm px-3 py-2 rounded-lg border border-slate-200">Cancelar</button>
                        </div>
                    </>
                ) : (
                    <p className="text-sm text-slate-700 whitespace-pre-line line-clamp-[12]">{post.caption}</p>
                )}

                {["DRAFT", "APPROVED", "FAILED"].includes(post.status) && !editando && (
                    <div className="rounded-xl border border-dashed border-slate-300 p-3 flex flex-col gap-2">
                        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1"><Smartphone className="w-3.5 h-3.5" /> Postar pelo celular</span>
                        <div className="flex flex-wrap gap-2">
                            <button onClick={() => copiarLegenda(post.caption)} className="text-sm px-3 py-2 rounded-lg border border-slate-200 flex items-center gap-1">
                                <Copy className="w-4 h-4" /> Copiar legenda
                            </button>
                            <button onClick={() => salvarMidia(post)} className="text-sm px-3 py-2 rounded-lg border border-slate-200 flex items-center gap-1">
                                <Download className="w-4 h-4" /> {post.mediaType === "REEL" ? "Salvar vídeo" : "Salvar arte"}
                            </button>
                            <button disabled={ocupado} onClick={() => acoes.publicadoAMao(post.id)} className="text-sm px-3 py-2 rounded-lg bg-slate-800 text-white flex items-center gap-1 disabled:opacity-60">
                                <CheckCircle className="w-4 h-4" /> Já postei à mão
                            </button>
                        </div>
                    </div>
                )}

                <div className="flex flex-wrap gap-2 mt-auto pt-2">
                    {["DRAFT", "FAILED", "REJECTED"].includes(post.status) && (
                        <button disabled={ocupado} onClick={() => acoes.aprovar(post.id)} className="text-sm px-3 py-2 rounded-lg bg-emerald-600 text-white flex items-center gap-1 disabled:opacity-60">
                            <CheckCircle className="w-4 h-4" /> {post.status === "FAILED" ? "Aprovar de novo" : "Aprovar"}
                        </button>
                    )}
                    {post.status === "APPROVED" && (
                        <button disabled={ocupado} onClick={() => acoes.publicar(post.id)} className="text-sm px-3 py-2 rounded-lg bg-primary-700 text-white flex items-center gap-1 disabled:opacity-60">
                            <Send className="w-4 h-4" /> Publicar agora
                        </button>
                    )}
                    {editavel && !editando && (
                        <button onClick={() => setEditando(true)} className="text-sm px-3 py-2 rounded-lg border border-slate-200 flex items-center gap-1">
                            <Edit3 className="w-4 h-4" /> Editar
                        </button>
                    )}
                    {["DRAFT", "APPROVED", "FAILED"].includes(post.status) && (
                        <button disabled={ocupado} onClick={() => acoes.rejeitar(post.id)} className="text-sm px-3 py-2 rounded-lg border border-slate-200 text-slate-600 flex items-center gap-1">
                            <XCircle className="w-4 h-4" /> Rejeitar
                        </button>
                    )}
                    {post.permalink && (
                        <a href={post.permalink} target="_blank" rel="noreferrer" className="text-sm px-3 py-2 rounded-lg border border-slate-200 flex items-center gap-1">
                            <ExternalLink className="w-4 h-4" /> Ver no {post.platform === "FACEBOOK" ? "Facebook" : "Instagram"}
                        </a>
                    )}
                    {!["PUBLISHED", "PUBLISHING"].includes(post.status) && (
                        <button disabled={ocupado} onClick={() => window.confirm("Apagar este post?") && acoes.apagar(post.id)} className="text-sm px-3 py-2 rounded-lg text-red-600 ml-auto" title="Apagar">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function AdminPublicationsPage() {
    const queryClient = useQueryClient();
    const [aba, setAba] = useState("DRAFT");
    const [rede, setRede] = useState("INSTAGRAM");

    // volta do diálogo do Facebook: ?facebook=ok&pagina=… ou ?facebook=erro&motivo=…
    useEffect(() => {
        const q = new URLSearchParams(window.location.search);
        if (!q.get("facebook")) return;
        if (q.get("facebook") === "ok") toast.success(`Facebook conectado: ${q.get("pagina") || "Página"}`);
        else toast.error(`Facebook não conectou: ${q.get("motivo") || "erro desconhecido"}`, { duration: 9000 });
        window.history.replaceState(null, "", window.location.pathname);
    }, []);

    const { data: statusData } = useQuery({
        queryKey: ["social-status"],
        queryFn: socialPostsApi.status,
        refetchInterval: (q) => (q.state.data?.data?.data?.gerando ? 15000 : false),
    });
    const status = statusData?.data?.data;

    const { data: postsData, isLoading } = useQuery({
        queryKey: ["social-posts", rede, aba],
        queryFn: () => socialPostsApi.list({ platform: rede, ...(aba && { status: aba }) }),
        refetchInterval: status?.gerando ? 15000 : false,
    });
    const posts = postsData?.data?.data || [];

    const atualizar = () => {
        queryClient.invalidateQueries({ queryKey: ["social-posts"] });
        queryClient.invalidateQueries({ queryKey: ["social-status"] });
    };
    const mut = (fn, ok) => useMutation({ mutationFn: fn, onSuccess: (r) => { atualizar(); toast.success(r?.data?.message || ok); }, onError: (e) => { atualizar(); toast.error(erroDe(e)); } });

    const gerar = mut(socialPostsApi.gerar, "Gerando rascunhos");
    const aprovar = mut(socialPostsApi.aprovar, "Aprovado");
    const rejeitar = mut(socialPostsApi.rejeitar, "Rejeitado");
    const editar = mut(({ id, caption }) => socialPostsApi.editarLegenda(id, caption), "Legenda atualizada");
    const publicar = mut(socialPostsApi.publicarAgora, "Publicado");
    const apagar = mut(socialPostsApi.delete, "Removido");
    const aMao = mut(socialPostsApi.publicadoAMao, "Marcado como publicado à mão");
    const conectarFb = useMutation({
        mutationFn: socialPostsApi.conectarFacebook,
        onSuccess: (r) => { window.location.href = r.data.data.url; },
        onError: (e) => toast.error(erroDe(e)),
    });

    const ocupado = [aprovar, rejeitar, editar, publicar, apagar, aMao].some((m) => m.isPending);
    const acoes = {
        aprovar: (id) => aprovar.mutate(id),
        rejeitar: (id) => rejeitar.mutate(id),
        editar: (id, caption) => editar.mutate({ id, caption }),
        publicadoAMao: (id) => window.confirm("Você já postou este conteúdo no Instagram pelo celular? Ele sai da fila e não será publicado de novo.") && aMao.mutate(id),
        publicar: (id) => window.confirm(`Publicar agora no ${rede === "FACEBOOK" ? "Facebook" : "Instagram"}?`) && publicar.mutate(id),
        apagar: (id) => apagar.mutate(id),
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="font-display text-3xl font-bold text-primary-950">Publicações</h1>
                <p className="text-slate-500 mt-1">O agente prepara arte e legenda revisada (e um Reel por dia); você aprova. Os posts aprovados saem às 12:00 e o Reel às 19:00.</p>
            </div>

            <PainelConta status={status} gerando={status?.gerando || gerar.isPending} onGerar={() => gerar.mutate()} />
            <PainelFacebook fb={status?.facebook} conectando={conectarFb.isPending} onConectar={() => conectarFb.mutate()} />

            {status?.facebook?.appConfigurado && <div className="flex gap-2 mb-3">
                {[["INSTAGRAM", "Instagram", Instagram], ["FACEBOOK", "Facebook", Facebook]].map(([k, rotulo, Icone]) => (
                    <button key={k} onClick={() => setRede(k)}
                        className={`text-sm px-4 py-2 rounded-lg border flex items-center gap-2 ${rede === k ? "bg-primary-900 text-white border-primary-900" : "bg-white border-slate-200 text-slate-600"}`}>
                        <Icone className="w-4 h-4" /> {rotulo}
                    </button>
                ))}
            </div>}

            <div className="flex gap-2 mb-6 flex-wrap">
                {ABAS.map((a) => (
                    <button key={a.key || "todos"} onClick={() => setAba(a.key)}
                        className={`text-sm px-4 py-2 rounded-full border ${aba === a.key ? "bg-primary-900 text-white border-primary-900" : "bg-white border-slate-200 text-slate-600"}`}>
                        {a.label}
                        {rede === "INSTAGRAM" && a.key && status?.porStatus?.[a.key] ? <span className="ml-2 opacity-70">{status.porStatus[a.key]}</span> : null}
                    </button>
                ))}
            </div>

            {isLoading ? (
                <div className="p-8 text-center text-slate-400">Carregando...</div>
            ) : posts.length === 0 ? (
                <div className="p-12 text-center text-slate-400 bg-white rounded-2xl border border-slate-200">
                    Nenhum post aqui. {aba === "DRAFT" && "Os rascunhos chegam todo dia às 07:30 — ou clique em “Gerar rascunhos agora”."}
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {posts.map((p) => <CartaoPost key={p.id + p.updatedAt} post={p} acoes={acoes} ocupado={ocupado} />)}
                </div>
            )}
        </div>
    );
}
