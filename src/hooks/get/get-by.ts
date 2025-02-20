import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import { AxiosInstance } from 'axios'
import { toast } from 'react-toastify'

import { Service } from '@/service'

interface ParamsGetBy {
	endpoint: string
	id: number | string
	enabled?: boolean
	api: AxiosInstance
}

export const useGetBy = <T extends object>({ endpoint, id, enabled, api }: ParamsGetBy) => {
	const service = new Service<T>(api, endpoint)

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
