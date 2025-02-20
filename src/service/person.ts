import axios from 'axios'

export const personAPI = axios.create({
	baseURL: import.meta.env.VITE_PERSON_API_URL,
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
	},
})
