import { TimePickerProps } from '@mui/x-date-pickers'
import { Control, Controller, Path, PathValue, useFormContext } from 'react-hook-form'

import TimePicker from '.'

interface Props<T extends object> extends TimePickerProps<Date> {
	control: Control<T>
	name: Path<T>
	clearable?: true
}

const ControlledTimePicker = <T extends object>({ control, name, clearable, ...props }: Props<T>) => {
	const { setValue } = useFormContext<T>()

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
				const { ref, ...rest } = field
				return (
					<TimePicker
						slotProps={{
							textField: {
								helperText: error && error.message,
								error: !!error,
							},
							...(clearable && {
								field: {
									clearable: true,
									onClear: () => setValue(name, null as PathValue<T, Path<T>>),
								},
							}),
						}}
						{...rest}
						{...props}
					/>
				)
			}}
		/>
	)
}

export default ControlledTimePicker
