import { emailFormSchema } from './email'
import { enderecoEspecificoSchema, pessoaFisicaSchema } from './pessoa'
import { phoneFormSchema } from './telefone'
import z from './zod'

export const clienteSchema = pessoaFisicaSchema.extend({
	id: z.number(),
})

export type Cliente = z.infer<typeof clienteSchema>

export const clienteFormSchema = pessoaFisicaSchema.omit({ endereco: true }).extend({
	telefones: phoneFormSchema.array(),
	emails: emailFormSchema.array(),
	endereco: enderecoEspecificoSchema.omit({ endereco: true }).extend({
		endereco: z.object({ id: z.number() }),
	}),
})

export type ClienteForm = z.infer<typeof clienteFormSchema>
