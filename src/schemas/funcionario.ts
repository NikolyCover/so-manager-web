import { emailFormSchema } from './email'
import { pessoaFisicaSchema } from './pessoa'
import { phoneFormSchema } from './telefone'
import z from './zod'

export const funcionarioSchema = pessoaFisicaSchema.extend({
	id: z.number(),
})

export type Funcionario = z.infer<typeof funcionarioSchema>

export const funcionarioFormSchema = pessoaFisicaSchema.omit({ nome: true, endereco: true }).extend({
	telefones: phoneFormSchema.array(),
	emails: emailFormSchema.array(),
	numeroEndereco: z.string().min(1),
	complementoEndereco: z.string(),
	endereco: z.object({ id: z.number() }),
})

export type FuncionarioForm = z.infer<typeof funcionarioFormSchema>
