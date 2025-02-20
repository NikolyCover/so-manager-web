import { emailFormSchema } from './email'
import { pessoaFisicaSchema } from './pessoa'
import { phoneFormSchema } from './telefone'
import z from './zod'

export const clienteSchema = pessoaFisicaSchema.extend({
	id: z.number(),
})

export type Cliente = z.infer<typeof clienteSchema>

export const clienteFormSchema = pessoaFisicaSchema.omit({ nome: true, enderecoEspecifico: true }).extend({
	telefones: phoneFormSchema.array(),
	emails: emailFormSchema.array(),
	numeroEndereco: z.string().min(1),
	complementoEndereco: z.string(),
	idEndereco: z.number(),
})

export type ClienteForm = z.infer<typeof clienteFormSchema>
