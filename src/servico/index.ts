import { AxiosInstance, AxiosResponse } from 'axios'
import qs from 'qs'

import { ReturnType } from '@/schemas/pageable'

export interface Params {
	[k: string]: unknown
}

export type updateMethod = 'patch' | 'put'

const paramsSerializer = (params: Record<string, unknown>) => {
	return qs.stringify(params, { encode: false, allowDots: true, arrayFormat: 'comma' })
}

export class Servico<T extends ReturnType> {
	constructor(
		private axiosInstance: AxiosInstance,
		private endpoint: string
	) {}

	async get<P extends ReturnType = T>(params: Params, endpoint?: string): Promise<P[]> {
		const response = await this.axiosInstance.get<P[]>(`/${endpoint ?? this.endpoint}`, {
			params,
			paramsSerializer,
		})

		return response.data
	}

	async criar<P extends ReturnType = T>(body?: P, endpoint?: string): Promise<AxiosResponse<T>> {
		return await this.axiosInstance.post<T>(`/${endpoint ?? this.endpoint}`, body)
	}

	async atualizar<P extends ReturnType = T>(
		id: number | string,
		body: P,
		endpoint?: string
	): Promise<AxiosResponse<T>> {
		return await this.axiosInstance.put<T>(endpoint ?? `${this.endpoint}/${id}`, body)
	}

	async patch<P extends ReturnType = T>(body?: P, endpoint?: string): Promise<AxiosResponse<T>> {
		return await this.axiosInstance.patch<T>(endpoint ?? this.endpoint, body)
	}

	async getPorId<P extends ReturnType = T>(params: Params, endpoint?: string, idName?: string): Promise<P> {
		const response = await this.axiosInstance.get<P>(`/${endpoint ?? this.endpoint}/${idName ?? 'id'}`, {
			params,
			paramsSerializer,
		})

		return response.data
	}

	async getObject<P extends ReturnType = T>(params: Params, endpoint?: string): Promise<P> {
		const response = await this.axiosInstance.get<P>(`/${endpoint ?? this.endpoint}`, {
			params,
			paramsSerializer,
		})

		return response.data
	}

	async apagar(id: number | string, endpoint?: string): Promise<void> {
		await this.axiosInstance.delete(endpoint ?? `/${this.endpoint}/${id}`)
	}
}
