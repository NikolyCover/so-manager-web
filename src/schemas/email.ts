import z from './zod'

export const emailSchema = z.object({
	id: z.number().optional(),
	endereco: z.string().email('E-mail inválido'),
})

export const emailFormSchema = emailSchema.omit({ id: true })

export type EmailForm = z.output<typeof emailFormSchema>

export type Email = z.output<typeof emailSchema>
