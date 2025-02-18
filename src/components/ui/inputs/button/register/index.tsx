import { Add } from '@carbon/icons-react'

import { Button } from '..'

interface Props {
	onClick: () => void
}

export const RegisterButton = ({ onClick }: Props) => {
	return <Button label="Cadastrar" onClick={onClick} startIcon={<Add />} />
}
