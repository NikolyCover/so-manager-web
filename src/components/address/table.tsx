import { useCallback } from 'react'

import { ColumnDef, createColumnHelper } from '@tanstack/react-table'

import Table from '@/components/ui/table'
import { ENDPOINTS } from '@/constants/endpoints'
import { useGetPageable } from '@/hooks/get'
import { Address } from '@/schemas/address'

export const AddressTable = () => {
	const { data: addresses, totalElements, isLoading } = useGetPageable<Address>({ endpoint: ENDPOINTS.ADDRESS })

	const columnHelper = createColumnHelper<Address>()

	const columns: ColumnDef<Address>[] = [
		columnHelper.accessor('location.name', {
			id: 'location.name',
			header: 'Rua',
			meta: {
				filter: { type: 'text', id: 'location.name' },
			},
		}),
		columnHelper.accessor('neighborhood.name', {
			id: 'neighborhood.name',
			header: 'Bairro',
			meta: {
				filter: { type: 'text', id: 'neighborhood.name' },
			},
		}),
		columnHelper.accessor('city.name', {
			id: 'city.name',
			header: 'Cidade',
			meta: {
				filter: { type: 'text', id: 'city.name' },
			},
		}),
		columnHelper.accessor('city.federalUnit.name', {
			id: 'city.federalUnit.name',
			header: 'Estado',
			meta: {
				filter: { type: 'text', id: 'city.federalUnit.name' },
			},
		}),
		columnHelper.accessor('zipCode', {
			id: 'zipCode',
			header: 'CEP',
			meta: {
				filter: { type: 'text', id: 'zipCode' },
			},
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
