import { emailSchema } from './email'
import { enderecoSchema } from './endereco'
import { phoneSchema } from './telefone'
import z from './zod'
import { validateCPF } from '@/utils/validate-cpf'

export const enderecoEspecificoSchema = z.object({
	numeroEndereco: z.string(),
	complementoEndereco: z.string(),
	endereco: enderecoSchema,
})

export type EnderecoEspecifico = z.output<typeof enderecoEspecificoSchema>

export const pessoaSchema = z.object({
	nome: z.string(),
	nomeSocial: z.string().optional(),
	emails: z.array(emailSchema),
	telefones: z.array(phoneSchema),
	endereco: enderecoEspecificoSchema.optional(),
})

export type Pessoa = z.output<typeof pessoaSchema>

export const pessoaFisicaSchema = pessoaSchema.extend({
	primeiroNome: z.string().min(1),
	nomeDoMeio: z.string().optional(),
	ultimoNome: z.string().min(1),
	cpf: z.string().min(11).refine(validateCPF, 'CPF inválido (digite somente números)'),
})

export type PessoaFisica = z.output<typeof pessoaFisicaSchema>
