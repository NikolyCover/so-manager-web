import z from './zod'

export const tipoServicoSchema = z.object({
	id: z.number().int(),
	nome: z.string(),
	valorReferencia: z.number(),
})

export type TipoServico = z.output<typeof tipoServicoSchema>

export const servicoSchema = z.object({
	id: z.number().int(),
	valorCobrado: z.number(),
	tipoServico: tipoServicoSchema,
})

export const servicoFormSchema = servicoSchema.omit({ id: true }).extend({
	tipoServico: z.object({ id: z.number() }),
})

export type Servico = z.output<typeof servicoSchema>
