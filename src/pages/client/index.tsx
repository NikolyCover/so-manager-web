import { Stack, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

import FullHeightLoading from '@/components/ui/feedback/loading/full-height'
import { Field } from '@/components/ui/field'
import { ENDPOINTS } from '@/constants/endpoints'
import { useGetBy } from '@/hooks/get/get-by'
import { ViewLayout } from '@/layouts/view'
import { Cliente } from '@/schemas/cliente'
import { formatCPF } from '@/utils/format-cpf'
import { formatPhone } from '@/utils/format-phone'

const CLientPage = () => {
	const { clientId } = useParams()

	const { data: client, isLoading } = useGetBy<Cliente>({
		endpoint: ENDPOINTS.CLIENTE,
		id: clientId ?? '',
	})

	if (isLoading) return <FullHeightLoading />

	if (!client) return null

	return (
		<ViewLayout.Root>
			<ViewLayout.Header.Root>
				<ViewLayout.Header.Title goBack>{`Cliente ${client.nome ?? ''}`}</ViewLayout.Header.Title>
			</ViewLayout.Header.Root>

			<ViewLayout.Content>
				<Stack direction="row" justifyContent="space-between" flexWrap="wrap">
					<Field label="Primeiro nome">{client.primeiroNome}</Field>
					<Field label="Nome do meio">{client.nomeDoMeio}</Field>
					<Field label="Último nome">{client.ultimoNome}</Field>
					<Field label="Nome social nome">{client.nomeSocial}</Field>
					<Field label="CPF">{formatCPF(client.cpf)}</Field>
				</Stack>

				<Typography variant="h2">Endereço</Typography>

				<Stack direction="row" justifyContent="space-between" flexWrap="wrap">
					<Field label="Logradouro">{`${client.endereco?.endereco.logradouro.tipoLogradouro.nome} ${client.endereco?.endereco.logradouro.nome}`}</Field>

					<Field label="Número">{client.endereco?.numeroEndereco}</Field>

					<Field label="Complemento">{client.endereco?.complementoEndereco}</Field>

					<Field label="Bairro">{client.endereco?.endereco.bairro.nome}</Field>

					<Field label="Cidade">{client.endereco?.endereco.cidade.nome}</Field>

					<Field label="Unidade Federativa">{`${client.endereco?.endereco.cidade.unidadeFederativa.nome} (${client.endereco?.endereco.cidade.unidadeFederativa.sigla})`}</Field>
				</Stack>

				<Stack gap={2}>
					<Typography variant="h2">Telefones</Typography>

					{client.telefones.map((phone, index) => (
						<Stack key={phone.id}>
							<Field label={`Telefone ${index}`}>
								{formatPhone(phone.ddi.numero, phone.ddd.numero, phone.numero)}
							</Field>
						</Stack>
					))}
				</Stack>

				<Stack gap={2}>
					<Typography variant="h2">Emails</Typography>

					{client.emails.map((email, index) => (
						<Stack key={email.id}>
							<Field label={`Email ${index}`}>{email.endereco}</Field>
						</Stack>
					))}
				</Stack>
			</ViewLayout.Content>
		</ViewLayout.Root>
	)
}

export default CLientPage
