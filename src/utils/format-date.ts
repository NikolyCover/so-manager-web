import { format } from 'date-fns'

export function formatarDate(date: Date | string): string {
	const dataObj = typeof date === 'string' ? new Date(date) : date
	return format(dataObj, 'dd/MM/yyyy')
}
