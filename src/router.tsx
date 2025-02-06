import { lazy } from 'react'

import { Navigate, createBrowserRouter } from 'react-router-dom'

import { NavigationLayout } from './layouts/navigation'
import ErrorFallback from './pages/error/fallback'
import ErrorNotFound from './pages/error/not-found'

const AddressesPage = lazy(() => import('@/pages/addresses'))

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
						path: 'addresses',
						children: [
							{
								index: true,
								element: <AddressesPage />,
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
