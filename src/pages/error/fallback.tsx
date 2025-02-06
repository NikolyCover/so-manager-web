import ErrorPage from '.'

const ErrorFallback = () => {
	return (
		<ErrorPage
			code={500}
			title="Ocorreu um erro no sistema"
			description="Contate o suporte ou tente novamente mais tarde"
		/>
	)
}

export default ErrorFallback
