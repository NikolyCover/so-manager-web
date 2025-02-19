/* eslint-disable prettier/prettier */
import { useCallback } from 'react'

import { ColumnDef, createColumnHelper } from '@tanstack/react-table'

import Table from '@/components/ui/table'
import { ENDPOINTS } from '@/constants/endpoints'
import { useGetPageable } from '@/hooks/get'
import { Address } from '@/schemas/address'

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
	} = useGetPageable<Address>({
		endpoint: external ? `${ENDPOINTS.ADDRESS}/${ENDPOINTS.EXTERNAL}` : ENDPOINTS.ADDRESS,
		enabled,
		requestParams,
	})

	const columnHelper = createColumnHelper<Address>()

	const columns: ColumnDef<Address>[] = [
		columnHelper.accessor('zipCode', {
			id: 'zipCode',
			header: 'CEP',
			meta: enableFilters
				? {
					filter: { type: 'text', id: 'zipCode' },
				}
				: undefined,
		}),
		columnHelper.accessor('location.name', {
			id: 'location.name',
			header: 'Logradouro',
			meta: enableFilters
				? {
					filter: { type: 'text', id: 'locationName' },
				}
				: undefined,
		}),
		columnHelper.accessor('neighborhood.name', {
			id: 'neighborhood.name',
			header: 'Bairro',
			meta: enableFilters
				? {
					filter: { type: 'text', id: 'neighborhoodName' },
				}
				: undefined,
		}),
		columnHelper.accessor('city.name', {
			id: 'city.name',
			header: 'Cidade',
			meta: enableFilters
				? {
					filter: { type: 'text', id: 'cityName' },
				}
				: undefined,
		}),
		columnHelper.accessor('city.federalUnit.name', {
			id: 'city.federalUnit.name',
			header: 'Unidade Federativa',
			meta: enableFilters
				? {
					filter: { type: 'text', id: 'federalUnitName' },
				}
				: undefined,
		}),
	] as ColumnDef<Address>[]

	const getRowLink = useCallback((address: Address) => `${address.id}`, [])

	return (
		<Table
			columns={columns}
			data={addresses}
			dataLength={totalElements}
			getRowLink={getRowLink}
			isLoading={isLoading}
		/>
	)
}
