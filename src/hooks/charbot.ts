/* eslint-disable indent */
import { useState } from 'react'

import { useAtom } from 'jotai'

import { messagesAtom } from '@/atoms/chatbot'
import { ENDPOINTS } from '@/constants/endpoints'
import { ChatbotResponse, Intencao } from '@/schemas/chatbot'
import { Cliente } from '@/schemas/cliente'
import { Funcionario } from '@/schemas/funcionario'
import { OrdemDeServico } from '@/schemas/os'
import { Service } from '@/service'
import { soAPI } from '@/service/api'
import { ChatbotMessage } from '@/types/chatbot'
import {
	formatarCliente,
	formatarFuncionario,
	formatarListaClientes,
	formatarListaFuncionarios,
	formatarListaOrdensDeServico,
	formatarOrdemDeServico,
} from '@/utils/chatbot'

const DEFAULT_MESSAGE = 'Lamento, não foi possível encontrar uma resposta para sua pergunta!'

export const useChatbot = () => {
	const service = new Service<ChatbotResponse>(soAPI, ENDPOINTS.CHATBOT)

	const [messages, setMessages] = useAtom(messagesAtom)
	const [isLoading, setIsLoading] = useState(false)

	const addMessage = (sender: 'user' | 'bot', text: string) => {
		const newMessage: ChatbotMessage = { sender, text }
		setMessages((prevMessages) => [...prevMessages, newMessage])
	}

	const clearMessages = () => {
		setMessages([])
	}

	const handleIntecao = async (intencao: Intencao, dados: string | null) => {
		switch (intencao) {
			case 'OBTER_CLIENTE_POR_ID': {
				const response = await service.getBy<Cliente>({ id: dados }, ENDPOINTS.CLIENTE)

				if (response) {
					return formatarCliente(response)
				}

				break
			}

			case 'OBTER_FUNCIONARIO_POR_ID': {
				const response = await service.getBy<Funcionario>({ id: dados }, ENDPOINTS.FUNCIONARIO)

				if (response) {
					return formatarFuncionario(response)
				}

				break
			}

			case 'OBTER_ORDEM_SERVICO_POR_NUMERO': {
				const response = await service.getBy<OrdemDeServico>({ numero: dados }, ENDPOINTS.OS, 'numero')

				if (response) {
					return formatarOrdemDeServico(response)
				}

				break
			}

			case 'OBTER_ORDEM_SERVICOS': {
				const response = await service.get<OrdemDeServico>({}, ENDPOINTS.OS)

				if (response) {
					return formatarListaOrdensDeServico(response)
				}

				break
			}

			case 'OBTER_CLIENTES': {
				const response = await service.get<Cliente>({}, ENDPOINTS.CLIENTE)

				if (response) {
					return formatarListaClientes(response)
				}

				break
			}

			case 'OBTER_FUNCIONARIOS': {
				const response = await service.get<Funcionario>({}, ENDPOINTS.FUNCIONARIO)

				if (response) {
					return formatarListaFuncionarios(response)
				}

				break
			}
		}
		return ''
	}

	const sendMessage = async (message: string) => {
		addMessage('user', message)

		setIsLoading(true)

		const response = await service.getOne({
			mensagem: message,
		})

		if (response.intencao) {
			const message = await handleIntecao(response.intencao, response.dados)

			if (message) {
				addMessage('bot', message)
			} else {
				addMessage('bot', DEFAULT_MESSAGE)
			}
		} else if (response.mensagemPadrao) {
			addMessage('bot', response.mensagemPadrao)
		} else {
			addMessage('bot', DEFAULT_MESSAGE)
		}

		setIsLoading(false)
	}

	return {
		sendMessage,
		messages,
		isPending: isLoading,
		clearMessages,
	}
}
