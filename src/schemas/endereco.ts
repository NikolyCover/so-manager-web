import z from './zod'

export const unidadeFederativaSchema = z.object({
	sigla: z.string(),
	nome: z.string(),
})

export type UnidadeFederativa = z.output<typeof unidadeFederativaSchema>

export const cidadeSchema = z.object({
	id: z.number().int().positive(),
	nome: z.string(),
	unidadeFederativa: unidadeFederativaSchema,
})

export type Cidade = z.output<typeof cidadeSchema>

export const tipoLogradouroSchema = z.object({
	id: z.number().int().positive(),
	nome: z.string(),
})

export type TipoLogradouro = z.output<typeof tipoLogradouroSchema>

export const logradouroSchema = z.object({
	id: z.number().int().positive(),
	nome: z.string(),
	tipoLogradouro: tipoLogradouroSchema,
})

export type Logradouro = z.output<typeof logradouroSchema>

export const bairroSchema = z.object({
	id: z.number().int().positive(),
	nome: z.string(),
})

export type Bairro = z.output<typeof bairroSchema>

export const enderecoSchema = z.object({
	id: z.number().int().positive(),
	cep: z.string(),
	bairro: bairroSchema,
	logradouro: logradouroSchema,
	cidade: cidadeSchema,
})

export const enderecoFormSchema = z.object({
	cep: z
		.string()
		.min(8, 'CEP deve ter no mínimo 8 caracteres')
		.max(9, 'CEP deve ter no máximo 9 caracteres')
		.regex(/^\d{5}\d{3}$/, 'CEP inválido. Formato esperado: 00000000'),
	logradouro: z.object({ id: z.number() }),
	bairro: z.object({ id: z.number() }),
	cidade: z.object({ id: z.number() }),
})

export type EnderecoForm = z.output<typeof enderecoFormSchema>

export type Endereco = z.output<typeof enderecoSchema>
