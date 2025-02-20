import { useEffect } from 'react'

import { Add, Close } from '@carbon/icons-react'
import { Button, IconButton, Stack } from '@mui/material'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

import ControlledTextField from '@/components/ui/inputs/text-field'
import { ClienteForm } from '@/schemas/cliente'

export const EmailsClientFormFields = () => {
	const { control } = useFormContext<ClienteForm>()

	const {
		fields: emailsFields,
		remove,
		append,
	} = useFieldArray({
		control,
		name: 'emails',
	})

	const addEmail = () =>
		append({
			endereco: '',
		})

	useEffect(() => {
		if (emailsFields.length === 0) addEmail()
	}, [emailsFields])

	return (
		<Stack gap={3}>
			{emailsFields.map((_field, index) => (
				<Stack key={uuidv4()} direction="row" gap={3}>
					<ControlledTextField
						control={control}
						name={`emails.${index}.endereco`}
						label="Endereço de email"
						type="email"
					/>

					<IconButton size="small" onClick={() => remove(index)}>
						<Close size={24} />
					</IconButton>
				</Stack>
			))}

			<Button variant="outlined" onClick={addEmail} startIcon={<Add />}>
				Adicionar
			</Button>
		</Stack>
	)
}
