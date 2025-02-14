import { LocalizationProvider, TimePicker as MuiTimePicker, TimePickerProps } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import { inputLocales } from '..'

const TimePicker: React.FC<TimePickerProps<Date>> = ({ ...props }) => {
	const { mui, dateFns } = inputLocales['pt']

	return (
		<LocalizationProvider
			dateAdapter={AdapterDateFns}
			adapterLocale={dateFns}
			localeText={mui.components.MuiLocalizationProvider.defaultProps.localeText}
		>
			<MuiTimePicker
				format="HH:mm:ss"
				views={['hours', 'minutes', 'seconds']}
				sx={{ width: '100%' }}
				{...props}
			/>
		</LocalizationProvider>
	)
}

export default TimePicker
