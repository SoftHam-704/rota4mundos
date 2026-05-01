import { z } from "zod";

export const createSponsorInterestSchema = z.object({
    body: z.object({
        name: z.string().min(2, "Nome obrigatório").max(100),
        email: z.string().email("E-mail inválido"),
        organization: z.string().max(150).optional(),
        type: z.enum(["INDIVIDUAL", "EMPRESARIAL", "INSTITUCIONAL"], {
            errorMap: () => ({ message: "Tipo inválido" }),
        }),
        message: z.string().max(1000).optional(),
    }),
});

export const updateSponsorStatusSchema = z.object({
    body: z.object({
        status: z.enum(["PENDENTE", "CONTATADO", "ATIVO", "ENCERRADO"]),
    }),
});
