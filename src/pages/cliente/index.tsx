import { Stack, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

import FullHeightLoading from '@/components/ui/feedback/loading/full-height'
import { Field } from '@/components/ui/field'
import { ENDPOINTS } from '@/constants/endpoints'
import { useGetBy } from '@/hooks/get/get-by'
import { ViewLayout } from '@/layouts/view'
import { Cliente } from '@/schemas/cliente'
import { formatCPF } from '@/utils/format-cpf'
import { formatPhone } from '@/utils/format-telefone'

const CLientPage = () => {
	const { clientId } = useParams()

	const { data: cliente, isLoading } = useGetBy<Cliente>({
		endpoint: ENDPOINTS.CLIENTE,
		id: clientId ?? '',
	})

	if (isLoading) return <FullHeightLoading />

	if (!cliente) return null

	return (
		<ViewLayout.Root>
			<ViewLayout.Header.Root>
				<ViewLayout.Header.Title goBack>{`Cliente ${cliente.nome ?? ''}`}</ViewLayout.Header.Title>
			</ViewLayout.Header.Root>

			<ViewLayout.Content>
				<Stack direction="row" justifyContent="space-between" flexWrap="wrap">
					<Field label="Primeiro nome">{cliente.primeiroNome}</Field>
					<Field label="Nome do meio">{cliente.nomeDoMeio}</Field>
					<Field label="Último nome">{cliente.ultimoNome}</Field>
					<Field label="Nome social nome">{cliente.nomeSocial}</Field>
					<Field label="CPF">{formatCPF(cliente.cpf)}</Field>
				</Stack>

				<Typography variant="h2">Endereço</Typography>

				<Stack direction="row" justifyContent="space-between" flexWrap="wrap">
					<Field label="Logradouro">{`${cliente.endereco?.endereco.logradouro.tipoLogradouro.nome} ${cliente.endereco?.endereco.logradouro.nome}`}</Field>

					<Field label="Número">{cliente.endereco?.numeroEndereco}</Field>

					<Field label="Complemento">{cliente.endereco?.complementoEndereco}</Field>

					<Field label="Bairro">{cliente.endereco?.endereco.bairro.nome}</Field>

					<Field label="Cidade">{cliente.endereco?.endereco.cidade.nome}</Field>

					<Field label="Unidade Federativa">{`${cliente.endereco?.endereco.cidade.unidadeFederativa.nome} (${cliente.endereco?.endereco.cidade.unidadeFederativa.sigla})`}</Field>
				</Stack>

				<Stack gap={2}>
					<Typography variant="h2">Telefones</Typography>

					{cliente.telefones.map((telefone, index) => (
						<Stack key={telefone.id}>
							<Field label={`Telefone ${index}`}>
								{formatPhone(telefone.ddi.numero, telefone.ddd.numero, telefone.numero)}
							</Field>
						</Stack>
					))}
				</Stack>

				<Stack gap={2}>
					<Typography variant="h2">Emails</Typography>

					{cliente.emails.map((email, index) => (
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
