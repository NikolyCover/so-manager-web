import z from './zod'

export const ddiSchema = z.object({
	numero: z.string(),
})

export type DDI = z.output<typeof ddiSchema>

export const dddSchema = z.object({
	numero: z.string(),
})

export type DDD = z.output<typeof dddSchema>

export const phoneSchema = z.object({
	id: z.number(),
	numero: z.string().min(1),
	ddd: dddSchema,
	ddi: ddiSchema,
})

export const phoneFormSchema = phoneSchema.omit({ id: true }).extend({
	ddi: z.object({ numero: z.string().min(1, 'DDI é obrigatório') }),
	ddd: z.object({ numero: z.string().min(1, 'DDD é obrigatório') }),
})

export type Phone = z.output<typeof phoneSchema>
