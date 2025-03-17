import { emailFormSchema } from './email'
import { enderecoEspecificoSchema, pessoaFisicaSchema } from './pessoa'
import { phoneFormSchema } from './telefone'
import z from './zod'

export const funcionarioSchema = pessoaFisicaSchema.extend({
	id: z.number(),
})

export type Funcionario = z.infer<typeof funcionarioSchema>

export const funcionarioFormSchema = pessoaFisicaSchema.omit({ nome: true, endereco: true }).extend({
	telefones: phoneFormSchema.array(),
	emails: emailFormSchema.array(),
	endereco: enderecoEspecificoSchema.omit({ endereco: true }).extend({
		endereco: z.object({ id: z.number() }),
	}),
})

export type FuncionarioForm = z.infer<typeof funcionarioFormSchema>
