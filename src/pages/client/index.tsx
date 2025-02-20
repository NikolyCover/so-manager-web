import { Stack, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

import FullHeightLoading from '@/components/ui/feedback/loading/full-height'
import { Field } from '@/components/ui/field'
import { ENDPOINTS } from '@/constants/endpoints'
import { useGetBy } from '@/hooks/get/get-by'
import { ViewLayout } from '@/layouts/view'
import { Cliente } from '@/schemas/cliente'
import { personAPI } from '@/service/person'
import { formatCPF } from '@/utils/format-cpf'
import { formatPhone } from '@/utils/format-phone'

const CLientPage = () => {
	const { clientId } = useParams()

	const { data: client, isLoading } = useGetBy<Cliente>({
		endpoint: ENDPOINTS.CLIENT,
		id: clientId ?? '',
		api: personAPI,
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
					<Field label="Logradouro">{`${client.enderecoEspecifico?.endereco.logradouro.locationType.nome} ${client.enderecoEspecifico?.endereco.logradouro.nome}`}</Field>

					<Field label="Número">{client.enderecoEspecifico?.numeroEndereco}</Field>

					<Field label="Complemento">{client.enderecoEspecifico?.complementEndereco}</Field>

					<Field label="Bairro">{client.enderecoEspecifico?.endereco.bairro.nome}</Field>

					<Field label="Cidade">{client.enderecoEspecifico?.endereco.cidade.nome}</Field>

					<Field label="Unidade Federativa">{`${client.enderecoEspecifico?.endereco.cidade.unidadeFederativa.nome} (${client.enderecoEspecifico?.endereco.cidade.unidadeFederativa.sigla})`}</Field>
				</Stack>

				<Stack gap={2}>
					<Typography variant="h2">Telefones</Typography>

					{client.telefones.map((phone, index) => (
						<Stack key={phone.id}>
							<Field label={`Telefone ${index}`}>
								{formatPhone(phone.ddi.ddi, phone.ddd.ddd, phone.numero)}
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
