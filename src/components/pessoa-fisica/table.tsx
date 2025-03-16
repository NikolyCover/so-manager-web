/* eslint-disable prettier/prettier */
import { useCallback } from 'react'

import { ColumnDef, createColumnHelper } from '@tanstack/react-table'

import Table from '@/components/ui/table'
import { ENDPOINTS } from '@/constants/endpoints'
import { useGetAll } from '@/hooks/get'
import { Cliente } from '@/schemas/cliente'
import { Funcionario } from '@/schemas/funcionario'
import { formatCPF } from '@/utils/format-cpf'

interface Props {
	enableFilters?: boolean
	requestParams?: Record<string, string>
	enabled?: boolean
	type: 'client' | 'funcionario'
}

export const PessoaFisicaTable = ({ requestParams, enabled = true, type }: Props) => {
	const {
		data: clientes,
		totalElements,
		isLoading,
	} = useGetAll<Cliente | Funcionario>({
		endpoint: type == 'client' ? ENDPOINTS.CLIENTE : ENDPOINTS.FUNCIONARIO,
		enabled,
		requestParams,
	})

	const columnHelper = createColumnHelper<Cliente | Funcionario>()

	const columns: ColumnDef<Cliente | Funcionario>[] = [
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
	] as ColumnDef<Cliente | Funcionario>[]

	const getRowLink = useCallback((cliente: Cliente) => `${cliente.id}`, [])

	return (
		<Table
			columns={columns}
			data={clientes}
			dataLength={totalElements}
			getRowLink={getRowLink}
			isLoading={isLoading}
		/>
	)
}
