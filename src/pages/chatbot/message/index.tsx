import { Stack, Typography } from '@mui/material'

import { PRIMARY_COLOR_DARK, PRIMARY_COLOR_LIGHT } from '@/constants/color'
import { theme } from '@/theme'
import { ChatbotMessage } from '@/types/chatbot'

export const Message = ({ sender, text }: ChatbotMessage) => {
	return (
		<Stack
			sx={{
				backgroundColor: sender === 'user' ? theme.palette.grey[100] : PRIMARY_COLOR_LIGHT,
				alignSelf: sender === 'user' ? 'flex-end' : 'flex-start',
			}}
			p={2}
			borderRadius={1}
			gap={1}
		>
			{sender == 'bot' && (
				<Typography fontWeight={600} color={PRIMARY_COLOR_DARK}>
					SO
				</Typography>
			)}
			<Typography sx={{ whiteSpace: 'pre-wrap' }}>{text}</Typography>
		</Stack>
	)
}
