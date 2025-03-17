import { useCallback, useMemo } from 'react'

import { MutationFunction, QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'react-toastify'

import { useLoading } from './loading'
import { Service } from '@/service'
import { soAPI } from '@/service/api'
import { ErrorResponse } from '@/types/error-response'

interface Params {
	endpoint: string
	invalidateQueries?: QueryKey[]
}

interface BaseMethodParams {
	successMessage?: string
}

interface MethodParams<P> extends BaseMethodParams {
	body: P
}

interface UpdateMethodParams<P> extends BaseMethodParams {
	body: P
	id: string | number
}

interface DeleteMethodParams extends BaseMethodParams {
	id: string | number
}

export const useMutate = <T extends object, P extends object = object>({
	endpoint,
	invalidateQueries = [],
}: Params) => {
	const service = new Service<T>(soAPI, endpoint)
	const queryClient = useQueryClient()
	const { startLoading, stopLoading } = useLoading()

	const onSuccess = useCallback(
		(_: unknown, { successMessage }: BaseMethodParams) => {
			queryClient.invalidateQueries({ queryKey: [endpoint] })

			for (const key of invalidateQueries) queryClient.invalidateQueries({ queryKey: key })

			if (successMessage && successMessage.length > 0) {
				toast.success(successMessage)
			}
		},
		[invalidateQueries]
	)

	const onError = useCallback((error: AxiosError<ErrorResponse>) => {
		stopLoading()
		const message = error.response?.data.message
		toast.error(message ?? 'Ocorreu um erro na requisição!')
	}, [])

	const createMutationFn: MutationFunction<AxiosResponse<T>, MethodParams<P>> = async ({ body }) => {
		startLoading()
		const result = await service.create(body)
		stopLoading()

		return result
	}

	const { mutateAsync: create, isPending: isLoadingCreate } = useMutation({
		mutationFn: createMutationFn,
		onSuccess,
		onError,
	})

	const patchMutationFn: MutationFunction<AxiosResponse<T>, MethodParams<P>> = async ({ body }) => {
		startLoading()
		const result = await service.patch(body)
		stopLoading()

		return result
	}

	const { mutateAsync: patch, isPending: isLoadingPatch } = useMutation({
		mutationFn: patchMutationFn,
		onSuccess,
		onError,
	})

	const updateMutationFn: MutationFunction<AxiosResponse<T>, UpdateMethodParams<P>> = async ({ body, id }) => {
		startLoading()
		const result = await service.update(id, body)
		stopLoading()

		return result
	}

	const { mutateAsync: update, isPending: isLoadingUpdate } = useMutation({
		mutationFn: updateMutationFn,
		onSuccess,
		onError,
	})

	const removeMutationFn: MutationFunction<void, DeleteMethodParams> = async ({ id }) => {
		startLoading()
		await service.delete(id)
		stopLoading()
	}

	const { mutateAsync: remove, isPending: isLoadingRemove } = useMutation({
		mutationFn: removeMutationFn,
		onSuccess,
		onError,
	})

	const isLoading = useMemo(
		() => isLoadingCreate || isLoadingUpdate || isLoadingPatch || isLoadingRemove,
		[isLoadingCreate, isLoadingUpdate, isLoadingPatch, isLoadingRemove]
	)

	return {
		create,
		update,
		patch,
		remove,
		isLoading,
	}
}
