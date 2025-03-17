import { z } from 'zod'

import { CHATBOT_INTENCOES } from '@/constants/chatbot'

export const intencaoSchema = z.enum(CHATBOT_INTENCOES)

export type Intencao = z.output<typeof intencaoSchema>

export const chatbotResponseSchema = z.object({
	intencao: intencaoSchema.nullable(),
	dados: z.string().nullable(),
	mensagemPadrao: z.string().nullable(),
})

export type ChatbotResponse = z.input<typeof chatbotResponseSchema>
