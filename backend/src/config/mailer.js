import nodemailer from "nodemailer";
import { env } from "./env.js";

export const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: Number(env.SMTP_PORT) || 587,
    secure: Number(env.SMTP_PORT) === 465,
    auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
    },
    tls: { rejectUnauthorized: false },
});

const FROM = env.SMTP_FROM || `"Rota 4 Mundos" <${env.SMTP_USER}>`;
const DEST = env.SMTP_USER; // apoio@rota4mundos.com.br

/* Notificação interna — novo interesse de apoiador/patrocinador */
export async function sendInterestNotification({ name, email, organization, type, message }) {
    const typeLabel = {
        EMPRESARIAL:  "Patrocínio Empresarial",
        INSTITUCIONAL: "Apoio Institucional",
        APOIADOR:     "Apoiador Individual",
        PREFEITURA:   "Município / Prefeitura",
    }[type] || type;

    await transporter.sendMail({
        from: FROM,
        to: DEST,
        replyTo: email,
        subject: `[Rota 4 Mundos] Novo interesse: ${typeLabel} — ${name}`,
        html: `
            <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;border-radius:12px;overflow:hidden;">
                <div style="background:#061B33;padding:28px 32px;">
                    <h1 style="color:#F4A261;font-size:20px;margin:0;">Rota 4 Mundos</h1>
                    <p style="color:rgba(255,255,255,0.5);font-size:12px;margin:4px 0 0;">Novo interesse recebido pelo portal</p>
                </div>
                <div style="padding:32px;">
                    <table style="width:100%;border-collapse:collapse;">
                        <tr><td style="padding:8px 0;color:#666;font-size:13px;width:140px;">Tipo</td><td style="padding:8px 0;font-weight:600;color:#061B33;">${typeLabel}</td></tr>
                        <tr><td style="padding:8px 0;color:#666;font-size:13px;">Nome</td><td style="padding:8px 0;font-weight:600;color:#061B33;">${name}</td></tr>
                        <tr><td style="padding:8px 0;color:#666;font-size:13px;">E-mail</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#F4A261;">${email}</a></td></tr>
                        ${organization ? `<tr><td style="padding:8px 0;color:#666;font-size:13px;">Organização</td><td style="padding:8px 0;color:#061B33;">${organization}</td></tr>` : ""}
                        ${message ? `<tr><td style="padding:8px 0;color:#666;font-size:13px;vertical-align:top;">Mensagem</td><td style="padding:8px 0;color:#061B33;white-space:pre-wrap;">${message}</td></tr>` : ""}
                    </table>
                </div>
                <div style="background:#f0f0f0;padding:16px 32px;font-size:11px;color:#999;">
                    Responda diretamente a este e-mail para entrar em contato com ${name}.
                </div>
            </div>
        `,
    });
}

/* Confirmação automática para quem preencheu o formulário */
export async function sendInterestConfirmation({ name, email, type }) {
    const typeLabel = {
        EMPRESARIAL:  "patrocínio empresarial",
        INSTITUCIONAL: "apoio institucional",
        APOIADOR:     "apoio individual",
        PREFEITURA:   "inclusão do município",
    }[type] || "interesse";

    await transporter.sendMail({
        from: FROM,
        to: email,
        subject: "Recebemos seu contato — Rota 4 Mundos",
        html: `
            <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;border-radius:12px;overflow:hidden;">
                <div style="background:#061B33;padding:28px 32px;">
                    <h1 style="color:#F4A261;font-size:20px;margin:0;">Rota 4 Mundos</h1>
                    <p style="color:rgba(255,255,255,0.5);font-size:12px;margin:4px 0 0;">Rota Bioceânica · Atlântico ao Pacífico</p>
                </div>
                <div style="padding:32px;">
                    <p style="font-size:16px;color:#061B33;">Olá, <strong>${name}</strong>!</p>
                    <p style="color:#444;line-height:1.7;">Recebemos sua solicitação de <strong>${typeLabel}</strong> com o portal Rota 4 Mundos. Nossa equipe irá analisar e entrar em contato em breve.</p>
                    <p style="color:#444;line-height:1.7;">Se tiver dúvidas, responda diretamente a este e-mail.</p>
                    <p style="margin-top:32px;color:#888;font-size:13px;">Equipe Rota 4 Mundos<br><a href="mailto:apoio@rota4mundos.com.br" style="color:#F4A261;">apoio@rota4mundos.com.br</a></p>
                </div>
            </div>
        `,
    });
}
