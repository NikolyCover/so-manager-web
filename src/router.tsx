import { lazy } from 'react'

import { Navigate, createBrowserRouter } from 'react-router-dom'

import { NavigationLayout } from './layouts/navigation'
import ErrorFallback from './pages/error/fallback'
import ErrorNotFound from './pages/error/not-found'

const AddressesPage = lazy(() => import('@/pages/enderecos'))
const AddressPage = lazy(() => import('@/pages/endereco'))
const ClientsPage = lazy(() => import('@/pages/clientes'))
const ClientPage = lazy(() => import('@/pages/cliente'))
const FuncionariosPage = lazy(() => import('@/pages/funcionarios'))
const FuncionarioPage = lazy(() => import('@/pages/funcionario'))
const OrdensDeServicosPage = lazy(() => import('@/pages/ordens-de-servicos'))
const OrdemDeServicoPage = lazy(() => import('@/pages/ordem-de-servico'))
const Chatbot = lazy(() => import('@/pages/chatbot'))

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
						path: 'chatbot',
						children: [
							{
								index: true,
								element: <Chatbot />,
							},
						],
					},
					{
						path: 'ordens-de-servicos',
						children: [
							{
								index: true,
								element: <OrdensDeServicosPage />,
							},
							{
								path: ':osId',
								element: <OrdemDeServicoPage />,
							},
						],
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
						path: 'funcionarios',
						children: [
							{
								index: true,
								element: <FuncionariosPage />,
							},
							{
								path: ':funcionarioId',
								element: <FuncionarioPage />,
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
