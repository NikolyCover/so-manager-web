import { useCallback, useMemo } from 'react'

import { useQuery } from '@tanstack/react-query'
import { data } from 'react-router-dom'

import { useFiltering } from '../filter/filtering'
import { usePagination } from '../pagination'
import { useSorting } from '../sorting'
import { ReturnType } from '@/schemas/pageable'
import { Servico } from '@/servico'
import { soAPI } from '@/servico/api'

export interface GetParams {
	endpoint: string
	requestParams?: {
		[k: string]: unknown
	}
	enabled?: boolean
}

export const useGetAll = <T extends ReturnType>({ endpoint, requestParams, enabled }: GetParams) => {
	const service = new Servico<T>(soAPI, endpoint)

	const queryFn = useCallback(async () => {
		const data = await service.get({
			//size: 2_147_483_647,
			...requestParams,
		})

		return {
			data: data ?? [],
		}
	}, [requestParams, service])

	const queryKey = useMemo(() => [endpoint, requestParams], [endpoint, requestParams])

	const { data: response, ...queryReturn } = useQuery({
		queryKey,
		queryFn,
		enabled,
	})

	return {
		data: response?.data ?? [],
		totalElements: data.length,
		...queryReturn,
	}
}

export const useGetPageable = <T extends ReturnType>({ endpoint, requestParams, ...rest }: GetParams) => {
	const { page, rowsPerPage } = usePagination()
	const { sort } = useSorting()

	const { filters } = useFiltering()

	return useGetAll<T>({
		endpoint,
		requestParams: {
			page,
			size: rowsPerPage,
			...(sort && { sort }),
			...filters,
			...requestParams,
		},
		...rest,
	})
}
