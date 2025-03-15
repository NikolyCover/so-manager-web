/* eslint-disable prettier/prettier */
import { useCallback } from 'react'

import { ColumnDef, createColumnHelper } from '@tanstack/react-table'

import Table from '@/components/ui/table'
import { ENDPOINTS } from '@/constants/endpoints'
import { useGetAll } from '@/hooks/get'
import { Endereco } from '@/schemas/endereco'
import { formatCEP } from '@/utils/format-cep'

interface Props {
	enableFilters?: boolean
	requestParams?: Record<string, string>
	external?: boolean
	enabled?: boolean
}

export const AddressTable = ({ requestParams, enableFilters = true, external = false, enabled = true }: Props) => {
	const {
		data: addresses,
		totalElements,
		isLoading,
	} = useGetAll<Endereco>({
		endpoint: external ? ENDPOINTS.ENDERECO_EXTERNO : ENDPOINTS.ENDERECO,
		enabled,
		requestParams,
	})

	const columnHelper = createColumnHelper<Endereco>()

	const columns: ColumnDef<Endereco>[] = [
		columnHelper.accessor('cep', {
			id: 'cep',
			header: 'CEP',
			meta: enableFilters
				? {
					filter: { type: 'text', id: 'cep' },
				}
				: undefined,
			cell: (cel) => formatCEP(cel.getValue()),
		}),
		columnHelper.accessor('logradouro.nome', {
			id: 'logradouro.nome',
			header: 'Logradouro',
			meta: enableFilters
				? {
					filter: { type: 'text', id: 'nomeLogradouro' },
				}
				: undefined,
		}),
		columnHelper.accessor('bairro.nome', {
			id: 'bairro.nome',
			header: 'Bairro',
			meta: enableFilters
				? {
					filter: { type: 'text', id: 'nomeBairro' },
				}
				: undefined,
		}),
		columnHelper.accessor('cidade.nome', {
			id: 'cidade.nome',
			header: 'Cidade',
			meta: enableFilters
				? {
					filter: { type: 'text', id: 'nomeCidade' },
				}
				: undefined,
		}),
		columnHelper.accessor('cidade.unidadeFederativa.nome', {
			id: 'cidade.unidadeFederativa.nome',
			header: 'Unidade Federativa',
			meta: enableFilters
				? {
					filter: { type: 'text', id: 'nomeUnidadeFederativa' },
				}
				: undefined,
		}),
	] as ColumnDef<Endereco>[]

	const getRowLink = useCallback((address: Endereco) => `${address.id}`, [])

	return (
		<Table
			columns={columns}
			data={(external ? [addresses] : addresses) as unknown as Endereco[]}
			dataLength={totalElements}
			getRowLink={getRowLink}
			isLoading={isLoading}
		/>
	)
}
