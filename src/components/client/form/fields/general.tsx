import { Stack } from '@mui/material'
import { useFormContext } from 'react-hook-form'

import ControlledTextField from '@/components/ui/inputs/text-field'
import { ClienteForm } from '@/schemas/cliente'

export const GeneralClientFormFields = () => {
	const { control } = useFormContext<ClienteForm>()

	return (
		<Stack gap={3}>
			<Stack direction="row" gap={3}>
				<ControlledTextField control={control} name="primeiroNome" label="Primeiro nome" />
				<ControlledTextField control={control} name="nomeDoMeio" label="Nome do meio" />
			</Stack>

			<Stack direction="row" gap={3}>
				<ControlledTextField control={control} name="ultimoNome" label="Último nome" />
				<ControlledTextField control={control} name="nomeSocial" label="Nome social" />
			</Stack>

			<ControlledTextField control={control} name="cpf" label="CPF" />
		</Stack>
	)
}
