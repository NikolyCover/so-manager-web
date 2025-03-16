import { Stack, Typography } from '@mui/material'

import { Field } from '@/components/ui/field'
import { Cliente } from '@/schemas/cliente'
import { Funcionario } from '@/schemas/funcionario'
import { formatCPF } from '@/utils/format-cpf'
import { formatPhone } from '@/utils/format-telefone'

interface Props {
	pessoa: Cliente | Funcionario
}

export const PesosoaFisicaDetails = ({ pessoa }: Props) => {
	return (
		<>
			<Stack direction="row" justifyContent="space-between" flexWrap="wrap">
				<Field label="Primeiro nome">{pessoa.primeiroNome}</Field>
				<Field label="Nome do meio">{pessoa.nomeDoMeio}</Field>
				<Field label="Último nome">{pessoa.ultimoNome}</Field>
				<Field label="Nome social">{pessoa.nomeSocial}</Field>
				<Field label="CPF">{formatCPF(pessoa.cpf)}</Field>
			</Stack>

			<Typography variant="h2">Endereço</Typography>
			<Stack direction="row" justifyContent="space-between" flexWrap="wrap">
				<Field label="Logradouro">{`${pessoa.endereco?.endereco.logradouro.tipoLogradouro.nome} ${pessoa.endereco?.endereco.logradouro.nome}`}</Field>
				<Field label="Número">{pessoa.endereco?.numeroEndereco}</Field>
				<Field label="Complemento">{pessoa.endereco?.complementoEndereco}</Field>
				<Field label="Bairro">{pessoa.endereco?.endereco.bairro.nome}</Field>
				<Field label="Cidade">{pessoa.endereco?.endereco.cidade.nome}</Field>
				<Field label="Unidade Federativa">{`${pessoa.endereco?.endereco.cidade.unidadeFederativa.nome} (${pessoa.endereco?.endereco.cidade.unidadeFederativa.sigla})`}</Field>
			</Stack>

			<Stack gap={2}>
				<Typography variant="h2">Telefones</Typography>
				{pessoa.telefones.map((telefone, index) => (
					<Stack key={telefone.id}>
						<Field label={`Telefone ${index + 1}`}>
							{formatPhone(telefone.ddi.numero, telefone.ddd.numero, telefone.numero)}
						</Field>
					</Stack>
				))}
			</Stack>

			<Stack gap={2}>
				<Typography variant="h2">Emails</Typography>
				{pessoa.emails.map((email, index) => (
					<Stack key={email.id}>
						<Field label={`Email ${index + 1}`}>{email.endereco}</Field>
					</Stack>
				))}
			</Stack>
		</>
	)
}
