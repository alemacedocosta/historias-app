import { z } from "zod";

const currentYear = new Date().getFullYear();

export const criarEspacoSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(80, "Nome deve ter no máximo 80 caracteres"),
});

export const criarMemoriaSchema : z.object({
  titulo: z
    .string()
    .min(2, "Título deve ter pelo menos 2 caracteres")
    .max(120, "Título deve ter no máximo 120 caracteres"),
  conteudo: z.string().max(5000, "Texto deve ter no máximo 5000 caracteres").optional(),
  anoAcontecimento: z
    .number()
    .int("Ano deve ser um número inteiro")
    .min(1900, "Ano deve ser a partir de 1900")
    .max(currentYear, `Ano não pode ser maior que ${currentYear}`),
  imagemUrl: z.string().url().optional().or(z.literal("")),
});

export const atualizarMemoriaSchema = criarMemoriaSchema.partial();

export type CriarEspacoInput = z.infer<typeof criarEspacoSchema>;
export type CriarMemoriaInput = z.infer<typeof criarMemoriaSchema>;
export type AtualizarMemoriaInput = z.infer<typeof atualizarMemoriaSchema>;
