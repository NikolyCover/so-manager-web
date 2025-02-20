import { useState } from 'react'

import { Stack, TextField, Typography } from '@mui/material'

import { InfoWarning } from '@/components/ui/feedback/warning/info'
import { Field } from '@/components/ui/field'
import { ENDPOINTS } from '@/constants/endpoints'
import { useGetBy } from '@/hooks/get/get-by'
import { Cidade } from '@/schemas/endereco'
import { addressAPI } from '@/service/address'

export const SearchCitySection = () => {
	const [cityName, setCityName] = useState('')

	const { data: city } = useGetBy<Cidade>({
		endpoint: `${ENDPOINTS.CITY}/${ENDPOINTS.NAME}`,
		id: cityName,
		enabled: cityName != '',
		api: addressAPI,
	})

	return (
		<>
			<Stack direction="row" justifyContent="space-between">
				<TextField
					label="Nome da cidade"
					value={cityName}
					onChange={(e) => setCityName((e.target.value as string) ?? '')}
				/>
			</Stack>

			<Typography variant="h2">Cidade</Typography>

			{city && (
				<Stack direction="row" gap={20}>
					<Field label="Id">{city.id}</Field>

					<Field label="Nome">{city.nome}</Field>

					<Field label="Unidade Federativa">{`${city.unidadeFederativa.nome} (${city.unidadeFederativa.sigla})`}</Field>
				</Stack>
			)}

			{!city && <InfoWarning description="Cidade não encontrada" />}
		</>
	)
}
