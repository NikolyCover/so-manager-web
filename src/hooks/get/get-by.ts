import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { Service } from '@/service'
import { soAPI } from '@/service/saad'

interface ParamsGetBy {
	endpoint: string
	id: number | string
	enabled?: boolean
}

export const useGetBy = <T extends object>({ endpoint, id, enabled }: ParamsGetBy) => {
	const service = new Service<T>(soAPI, endpoint)

	const { data, error, isLoading } = useQuery({
		queryKey: [endpoint, id],
		queryFn: async () => await service.getBy(id),
		enabled: id ? enabled : false,
	})

	useEffect(() => {
		if (error) {
			toast.error('message.request.error')
		}
	}, [error])

	return { data, isLoading }
}
