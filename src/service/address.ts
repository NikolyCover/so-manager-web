import axios from 'axios'

export const addressAPI = axios.create({
	baseURL: import.meta.env.VITE_ADDRESS_API_URL,
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
	},
})
