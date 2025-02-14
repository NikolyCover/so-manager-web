/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import '@tanstack/react-table'
import { RowData } from '@tanstack/react-table'

export type FilterType = 'text' | 'select' | 'range'

export interface BaseFilter {
	type: FilterType
	id: string
}

export interface TextFilter extends BaseFilter {
	type: 'text'
}

export type Filter = TextFilter

declare module '@tanstack/react-table' {
	interface ColumnMeta<TData extends RowData, TValue> {
		filter: Filter
	}
}
