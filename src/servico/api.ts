import axios from 'axios'

export const soAPI = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
	},
})
