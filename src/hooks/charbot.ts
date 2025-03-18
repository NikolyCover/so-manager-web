/* eslint-disable indent */
import { useState } from 'react'

import { useAtom } from 'jotai'

import { messagesAtom } from '@/atoms/chatbot'
import { ENDPOINTS } from '@/constants/endpoints'
import { ChatbotResponse, Intencao } from '@/schemas/chatbot'
import { Cliente } from '@/schemas/cliente'
import { Funcionario } from '@/schemas/funcionario'
import { OrdemDeServico } from '@/schemas/os'
import { TipoServico } from '@/schemas/servico'
import { Servico } from '@/servico'
import { soAPI } from '@/servico/api'
import { ChatbotMessage } from '@/types/chatbot'
import {
	formatarCliente,
	formatarFuncionario,
	formatarListaClientes,
	formatarListaFuncionarios,
	formatarListaOrdensDeServico,
	formatarListaTiposServico,
	formatarOrdemDeServico,
	formatarTipoServico,
} from '@/utils/chatbot'

const DEFAULT_MESSAGE = 'Lamento, não foi possível encontrar uma resposta para sua pergunta!'

export const useChatbot = () => {
	const service = new Servico<ChatbotResponse>(soAPI, ENDPOINTS.CHATBOT)

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
		try {
			switch (intencao) {
				case 'OBTER_CLIENTE_POR_ID': {
					const response = await service.getPorId<Cliente>({ id: dados }, ENDPOINTS.CLIENTE)
					return response ? formatarCliente(response) : DEFAULT_MESSAGE
				}

				case 'OBTER_FUNCIONARIO_POR_ID': {
					const response = await service.getPorId<Funcionario>({ id: dados }, ENDPOINTS.FUNCIONARIO)
					return response ? formatarFuncionario(response) : DEFAULT_MESSAGE
				}

				case 'OBTER_ORDEM_SERVICO_POR_NUMERO': {
					const response = await service.getPorId<OrdemDeServico>({ numero: dados }, ENDPOINTS.OS, 'numero')
					return response ? formatarOrdemDeServico(response) : DEFAULT_MESSAGE
				}

				case 'OBTER_ORDEM_SERVICOS': {
					const response = await service.get<OrdemDeServico>({}, ENDPOINTS.OS)
					return response ? formatarListaOrdensDeServico(response) : DEFAULT_MESSAGE
				}

				case 'OBTER_CLIENTES': {
					const response = await service.get<Cliente>({}, ENDPOINTS.CLIENTE)
					return response ? formatarListaClientes(response) : DEFAULT_MESSAGE
				}

				case 'OBTER_FUNCIONARIOS': {
					const response = await service.get<Funcionario>({}, ENDPOINTS.FUNCIONARIO)
					return response ? formatarListaFuncionarios(response) : DEFAULT_MESSAGE
				}

				case 'OBTER_TIPOS_SERVICOS': {
					const response = await service.get<TipoServico>({}, ENDPOINTS.TIPO_SERVICO)
					return response ? formatarListaTiposServico(response) : DEFAULT_MESSAGE
				}

				case 'OBTER_TIPO_SERVICO_POR_ID': {
					const response = await service.getPorId<TipoServico>({ id: dados }, ENDPOINTS.TIPO_SERVICO)
					return response ? formatarTipoServico(response) : DEFAULT_MESSAGE
				}

				default: {
					return DEFAULT_MESSAGE
				}
			}
		} catch (error) {
			console.error(`Erro ao processar intenção ${intencao}:`, error)
			return DEFAULT_MESSAGE
		}
	}

	const sendMessage = async (message: string) => {
		addMessage('user', message)

		setIsLoading(true)

		const response = await service.getObject({
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
