import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres").max(100),
    email: z.string().email("Email inválido"),
    password: z
        .string()
        .min(8, "Senha deve ter no mínimo 8 caracteres")
        .regex(/[A-Z]/, "Senha deve conter pelo menos uma letra maiúscula")
        .regex(/[a-z]/, "Senha deve conter pelo menos uma letra minúscula")
        .regex(/[0-9]/, "Senha deve conter pelo menos um número"),
});

export const loginSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(1, "Senha é obrigatória"),
});

export const forgotPasswordSchema = z.object({
    email: z.string().email("Email inválido"),
});
