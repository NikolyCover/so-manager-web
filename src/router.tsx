import { lazy } from 'react'

import { Navigate, createBrowserRouter } from 'react-router-dom'

import { NavigationLayout } from './layouts/navigation'
import ErrorFallback from './pages/error/fallback'
import ErrorNotFound from './pages/error/not-found'

const AddressesPage = lazy(() => import('@/pages/addresses'))
const AddressPage = lazy(() => import('@/pages/address'))
const ClientsPage = lazy(() => import('@/pages/clients'))

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
						element: <Navigate to="addresses" />,
					},
					{
						path: 'clients',
						children: [
							{
								index: true,
								element: <ClientsPage />,
							},
						],
					},
					{
						path: 'addresses',
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
