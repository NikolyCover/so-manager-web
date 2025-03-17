import { atomWithStorage } from 'jotai/utils'

import { ChatbotMessage } from '@/types/chatbot'

export const messagesAtom = atomWithStorage<ChatbotMessage[]>('chatbot-messages', [])
