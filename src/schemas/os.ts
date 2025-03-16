import { clienteSchema } from './cliente'
import { funcionarioSchema } from './funcionario'
import { servicoFormSchema, servicoSchema } from './servico'
import z from './zod'

export const ordemDeServicoSchema = z.object({
	numero: z.string(),
	dataEmissao: z.date(),
	descricao: z.string(),
	cliente: clienteSchema,
	funcionarioResponsavel: funcionarioSchema,
	servicosRealizados: z.array(servicoSchema),
	valorTotal: z.number().optional(),
})

export type OrdemDeServico = z.output<typeof ordemDeServicoSchema>

export const ordemDeServicoFormSchema = ordemDeServicoSchema.extend({
	cliente: z.object({ id: z.number() }),
	funcionarioResponsavel: z.object({ id: z.number() }),
	servicosRealizados: servicoFormSchema.array(),
})

export type OrdemDeServicoForm = z.output<typeof ordemDeServicoFormSchema>
