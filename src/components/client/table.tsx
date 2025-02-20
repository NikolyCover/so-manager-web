/* eslint-disable prettier/prettier */
import { useCallback } from 'react'

import { ColumnDef, createColumnHelper } from '@tanstack/react-table'

import Table from '@/components/ui/table'
import { ENDPOINTS } from '@/constants/endpoints'
import { useGetPageable } from '@/hooks/get'
import { Cliente } from '@/schemas/cliente'
import { personAPI } from '@/service/person'
import { formatCPF } from '@/utils/format-cpf'

interface Props {
	enableFilters?: boolean
	requestParams?: Record<string, string>
	enabled?: boolean
}

export const ClientTable = ({ requestParams, enabled = true }: Props) => {
	const {
		data: clients,
		totalElements,
		isLoading,
	} = useGetPageable<Cliente>({
		endpoint: ENDPOINTS.CLIENT,
		enabled,
		requestParams,
		api: personAPI,
	})

	const columnHelper = createColumnHelper<Cliente>()

	const columns: ColumnDef<Cliente>[] = [
		columnHelper.accessor('nome', {
			id: 'nome',
			header: 'nome',
		}),
		columnHelper.accessor('nomeSocial', {
			id: 'nomeSocial',
			header: 'Nome social',
		}),
		columnHelper.accessor('cpf', {
			id: 'cpf',
			header: 'CPF',
			cell: (col) => formatCPF(col.cell.getValue()),
		}),
		columnHelper.accessor('enderecoEspecifico.endereco.cidade.nome', {
			id: 'enderecoEspecifico.endereco.cidade.nome',
			header: 'Cidade',
		}),
		columnHelper.accessor('enderecoEspecifico.endereco.cidade.unidadeFederativa.sigla', {
			id: 'enderecoEspecifico.endereco.cidade.unidadeFederativa.sigla',
			header: 'Unidade Federativa',
		}),
		columnHelper.accessor('enderecoEspecifico.endereco.bairro.nome', {
			id: 'enderecoEspecifico.endereco.bairro.nome',
			header: 'Bairro',
		}),
	] as ColumnDef<Cliente>[]

	const getRowLink = useCallback((client: Cliente) => `${client.id}`, [])

	return (
		<Table
			columns={columns}
			data={clients}
			dataLength={totalElements}
			getRowLink={getRowLink}
			isLoading={isLoading}
		/>
	)
}
