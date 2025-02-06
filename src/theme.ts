import { createTheme } from '@mui/material'

export const theme = createTheme({
	typography: {
		button: {
			textTransform: 'initial',
		},
		h1: {
			fontWeight: 500,
			fontSize: 24,
			lineHeight: '32px',
		},
		h2: {
			fontWeight: 300,
			fontSize: 20,
		},
		h3: {
			fontWeight: 300,
			fontSize: 16,
		},
		h4: {
			fontWeight: 600,
			fontSize: 14,
		},
	},
	components: {
		MuiToggleButton: {
			styleOverrides: {
				root: {
					display: 'flex',
					justifyContent: 'start',
					gap: '16px',
					padding: '16px 24px',
					//color: JUICY_PALETTE.neutral[70],
					fontWeight: 400,
					borderRadius: 0,
					border: 'none',
					height: '56px',

					'& svg': {
						//fill: JUICY_PALETTE.neutral[70],
						width: '20px',
						height: '20px',
					},

					'&.Mui-selected': {
						//color: JUICY_PALETTE.primary[60],
						'& svg': {
							//fill: JUICY_PALETTE.primary[60],
						},
					},
				},
			},
		},
	},
})
