/* eslint-disable prettier/prettier */
import { useCallback } from 'react'

import { ColumnDef, createColumnHelper } from '@tanstack/react-table'

import Table from '@/components/ui/table'
import { ENDPOINTS } from '@/constants/endpoints'
import { useGetAll } from '@/hooks/get'
import { OrdemDeServico } from '@/schemas/os'

interface Props {
	requestParams?: Record<string, string>
	enabled?: boolean
}

export const OrdemDeServicoTable = ({ requestParams, enabled = true }: Props) => {
	const {
		data: ordemDeServicos,
		totalElements,
		isLoading,
	} = useGetAll<OrdemDeServico>({
		endpoint: ENDPOINTS.OS,
		enabled,
		requestParams,
	})

	const columnHelper = createColumnHelper<OrdemDeServico>()

	const columns: ColumnDef<OrdemDeServico>[] = [
		columnHelper.accessor('numero', {
			id: 'numero',
			header: 'Número',
		}),
		columnHelper.accessor('descricao', {
			id: 'descricao',
			header: 'Descrição',
		}),
		columnHelper.accessor('cliente.nome', {
			id: 'cliente.nome',
			header: 'Cliente',
		}),
		columnHelper.accessor('funcionarioResponsavel.nome', {
			id: 'funcionarioResponsavel.nome',
			header: 'Funcionario',
		}),
		columnHelper.accessor('valorTotal', {
			id: 'valorTotal',
			header: 'Valor total',
		}),
	] as ColumnDef<OrdemDeServico>[]

	const getRowLink = useCallback((os: OrdemDeServico) => `${os.numero}`, [])

	return (
		<Table
			columns={columns}
			data={ordemDeServicos}
			dataLength={totalElements}
			getRowLink={getRowLink}
			isLoading={isLoading}
		/>
	)
}
