import { useState } from 'react'

import { FormControlLabel, Stack, Switch, TextField } from '@mui/material'

import { AddressTable } from '@/components/endereco/table'
import { isValidZipCode } from '@/utils/is-valid-zip-code'

export const SearchByZipCodeSection = () => {
	const [zipCode, setZipCode] = useState('')
	const [external, setExternal] = useState(false)

	return (
		<>
			<Stack direction="row" justifyContent="space-between">
				<TextField
					label="CEP"
					value={zipCode}
					onChange={(e) => setZipCode((e.target.value as string) ?? '')}
					helperText={isValidZipCode(zipCode) ? undefined : 'CEP inválido'}
					error={!isValidZipCode(zipCode)}
				/>
				<FormControlLabel
					label="Buscar de site externo"
					control={<Switch checked={external} onChange={(e) => setExternal(e.target.checked)} />}
				/>
			</Stack>

			<AddressTable
				enableFilters={false}
				requestParams={{ cep: zipCode }}
				external={external}
				enabled={isValidZipCode(zipCode)}
			/>
		</>
	)
}
