/* eslint-disable prettier/prettier */
import { useCallback } from 'react'

import { ColumnDef, createColumnHelper } from '@tanstack/react-table'

import Table from '@/components/ui/table'
import { ENDPOINTS } from '@/constants/endpoints'
import { useGetAll } from '@/hooks/get'
import { Cliente } from '@/schemas/cliente'
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
	} = useGetAll<Cliente>({
		endpoint: ENDPOINTS.CLIENTE,
		enabled,
		requestParams,
	})

	const columnHelper = createColumnHelper<Cliente>()

	const columns: ColumnDef<Cliente>[] = [
		columnHelper.accessor('nome', {
			id: 'nome',
			header: 'nome',
			enableSorting: false,
		}),
		columnHelper.accessor('nomeSocial', {
			id: 'nomeSocial',
			header: 'Nome social',
			enableSorting: false,
		}),
		columnHelper.accessor('cpf', {
			id: 'cpf',
			header: 'CPF',
			cell: (col) => formatCPF(col.cell.getValue()),
			enableSorting: false,
		}),
		columnHelper.accessor('endereco.endereco.cidade.nome', {
			id: 'endereco.endereco.cidade.nome',
			header: 'Cidade',
			enableSorting: false,
		}),
		columnHelper.accessor('endereco.endereco.cidade.unidadeFederativa.sigla', {
			id: 'endereco.endereco.cidade.unidadeFederativa.sigla',
			header: 'Unidade Federativa',
			enableSorting: false,
		}),
		columnHelper.accessor('endereco.endereco.bairro.nome', {
			id: 'endereco.endereco.bairro.nome',
			header: 'Bairro',
			enableSorting: false,
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
