import { Stack } from '@mui/material'
import { useFormContext } from 'react-hook-form'

import ControlledSelect from '@/components/ui/inputs/select/controlled'
import ControlledTextField from '@/components/ui/inputs/text-field'
import { ENDPOINTS } from '@/constants/endpoints'
import { useGetAll } from '@/hooks/get'
import { Cliente } from '@/schemas/cliente'
import { Funcionario } from '@/schemas/funcionario'
import { OrdemDeServicoForm } from '@/schemas/os'

export const GeneralOSFormFields = () => {
	const { control } = useFormContext<OrdemDeServicoForm>()

	const { data: funcionarios } = useGetAll<Funcionario>({ endpoint: ENDPOINTS.FUNCIONARIO })
	const { data: clientes } = useGetAll<Cliente>({ endpoint: ENDPOINTS.CLIENTE })

	return (
		<Stack gap={3}>
			<Stack direction="row" gap={3}>
				<ControlledTextField control={control} name="numero" label="Número" />
				<ControlledTextField control={control} name="descricao" label="Descrição" />
			</Stack>

			<Stack direction="row" gap={3}>
				<ControlledSelect
					control={control}
					name="funcionarioResponsavel.id"
					label="Funcionario"
					items={funcionarios.map((func) => ({
						label: `${func.nome} - ${func.cpf}`,
						value: func.id,
					}))}
				/>

				<ControlledSelect
					control={control}
					name="cliente.id"
					label="Cliente"
					items={clientes.map((cliente) => ({
						label: `${cliente.nome} - ${cliente.cpf}`,
						value: cliente.id,
					}))}
				/>
			</Stack>
		</Stack>
	)
}
