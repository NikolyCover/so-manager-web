import { emailFormSchema } from './email'
import { pessoaFisicaSchema } from './pessoa'
import { phoneFormSchema } from './telefone'
import z from './zod'

export const clienteSchema = pessoaFisicaSchema.extend({
	id: z.number(),
})

export type Cliente = z.infer<typeof clienteSchema>

export const clienteFormSchema = pessoaFisicaSchema.omit({ nome: true, endereco: true }).extend({
	telefones: phoneFormSchema.array(),
	emails: emailFormSchema.array(),
	numeroEndereco: z.string().min(1),
	complementoEndereco: z.string(),
	endereco: z.object({ id: z.number() }),
})

export type ClienteForm = z.infer<typeof clienteFormSchema>
