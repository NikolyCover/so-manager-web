import { lazy } from 'react'

import { Navigate, createBrowserRouter } from 'react-router-dom'

import { NavigationLayout } from './layouts/navigation'
import ErrorFallback from './pages/error/fallback'
import ErrorNotFound from './pages/error/not-found'

const AddressesPage = lazy(() => import('@/pages/enderecos'))
const AddressPage = lazy(() => import('@/pages/endereco'))
const ClientsPage = lazy(() => import('@/pages/clientes'))
const ClientPage = lazy(() => import('@/pages/cliente'))

export const router = createBrowserRouter([
	{
		path: '/',
		errorElement: <ErrorFallback />,
		children: [
			{
				element: <NavigationLayout />,

				children: [
					{
						index: true,
						element: <Navigate to="clientes" />,
					},
					{
						path: 'clientes',
						children: [
							{
								index: true,
								element: <ClientsPage />,
							},
							{
								path: ':clientId',
								element: <ClientPage />,
							},
						],
					},
					{
						path: 'enderecos',
						children: [
							{
								index: true,
								element: <AddressesPage />,
							},
							{
								path: ':addressId',
								element: <AddressPage />,
							},
						],
					},
				],
			},
			{
				path: '*',
				element: <ErrorNotFound />,
			},
		],
	},
])
