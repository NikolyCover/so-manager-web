import { FC, useCallback, useEffect, useRef, useState } from 'react'

import { SendFilled } from '@carbon/icons-react'
import { Button, IconButton, Stack, TextField } from '@mui/material'

import { Message } from './message'
import Loading from '@/components/ui/feedback/loading'
import { useChatbot } from '@/hooks/charbot'
import { ViewLayout } from '@/layouts/view'

const Chatbot: FC = () => {
	const messagesEndRef = useRef<HTMLDivElement>(null)

	const [message, setMessage] = useState('')
	const { sendMessage, messages, isPending, clearMessages } = useChatbot()

	const handleSubmit = useCallback(() => {
		sendMessage(message)
		setMessage('')
	}, [message])

	useEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}, [messages, isPending])

	return (
		<ViewLayout.Root>
			<ViewLayout.Header.Root>
				<ViewLayout.Header.Title>Assistente virtual</ViewLayout.Header.Title>
				<ViewLayout.Header.RightElements>
					<Button variant="text" onClick={clearMessages} disabled={messages.length === 0}>
						Limpar chat
					</Button>
				</ViewLayout.Header.RightElements>
			</ViewLayout.Header.Root>

			<ViewLayout.Content>
				<Stack justifyContent="space-between" gap={3}>
					<Stack
						//bgcolor={(theme) => theme.palette.juicy.neutral[20]}
						width="100%"
						height="70vh"
						p={3}
						gap={3}
						sx={{ overflowY: 'auto' }}
					>
						<Message
							sender="bot"
							text="Olá! Sou o SO, o assistente virtual do SO Manager. Como posso te ajudar? 😊"
						/>

						{messages.map((message, index) => (
							<Message key={index + message.text} {...message} />
						))}

						{isPending && <Loading />}

						<div ref={messagesEndRef} />
					</Stack>

					<TextField
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter' && message.length > 0 && !isPending) {
								e.preventDefault()
								handleSubmit()
							}
						}}
						InputProps={{
							endAdornment: (
								<IconButton
									disabled={message.length === 0 || isPending}
									size="large"
									sx={{ color: (theme) => theme.palette.secondary.main }}
									onClick={handleSubmit}
								>
									<SendFilled size={32} />
								</IconButton>
							),
						}}
						placeholder="Digite aqui a sua pergunta"
					/>
				</Stack>
			</ViewLayout.Content>
		</ViewLayout.Root>
	)
}

export default Chatbot
