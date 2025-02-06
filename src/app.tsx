import { CssBaseline, ThemeProvider } from '@mui/material'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { router } from './router'
import { theme } from './theme'

export const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<ToastContainer autoClose={5000} position="bottom-left" />

			<CssBaseline />
			<RouterProvider router={router} />
		</ThemeProvider>
	)
}
