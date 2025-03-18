import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { Servico } from '@/servico'
import { soAPI } from '@/servico/api'

interface ParamsGetBy {
	endpoint: string
	id: number | string
	enabled?: boolean
	idName?: string
}

export const useGetBy = <T extends object>({ endpoint, id, enabled, idName }: ParamsGetBy) => {
	const service = new Servico<T>(soAPI, endpoint)

	const { data, error, isLoading } = useQuery({
		queryKey: [endpoint, id],
		queryFn: async () =>
			await service.getPorId(
				{
					[idName ?? 'id']: id,
				},
				undefined,
				idName
			),
		enabled: id ? enabled : false,
	})

	useEffect(() => {
		if (error) {
			toast.error('message.request.error')
		}
	}, [error])

	return { data, isLoading }
}
