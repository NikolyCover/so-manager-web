import { ReactNode } from 'react'

import {
	Table as MuiTable,
	Stack,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
} from '@mui/material'
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Link } from 'react-router-dom'

import TableLoading from './loading/rows'
import { TablePaginationSkeleton } from './loading/skeleton/pagination'
import TableNoDataWarning from './no-data-warning'
import TableControls from './table-controls'
import TableHeader from './table-header'
import { usePagination } from '@/hooks/pagination'

export interface TableProps<T> {
	data: T[]
	dataLength: number
	columns: ColumnDef<T>[]
	isLoading?: boolean
	getRowLink?: (data: T) => string
	endTableControls?: ReactNode
	getEndRowNode?: (data: T) => ReactNode
}

const Table = <T extends object>({
	data,
	columns,
	dataLength,
	isLoading,
	getRowLink,
	endTableControls,
	getEndRowNode: getEndNode,
}: TableProps<T>) => {
	const { rowsPerPage, page, changePage, changeRowsPerPage } = usePagination()

	const { getHeaderGroups, getRowModel } = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	return (
		<Stack gap={2}>
			<TableControls endControls={endTableControls} />

			<TableContainer>
				<MuiTable>
					<TableHead>
						{getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHeader key={header.id} header={header} />
								))}
								{getEndNode && <TableCell sx={{ width: 0 }}></TableCell>}
							</TableRow>
						))}
					</TableHead>

					<TableBody>
						{isLoading ? (
							<TableLoading columns={columns.length} rows={rowsPerPage} />
						) : (
							getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									component={getRowLink ? Link : TableRow}
									to={getRowLink && getRowLink(row.original)}
									sx={{ textDecoration: 'none', cursor: getRowLink ? 'pointer' : 'default' }}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id} sx={{ width: cell.column.getSize() }}>
											{cell.getValue() == null
												? '-'
												: flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
									{getEndNode && <TableCell sx={{ width: 0 }}>{getEndNode(row.original)}</TableCell>}
								</TableRow>
							))
						)}
					</TableBody>
				</MuiTable>

				{data.length > 0 && !isLoading && (
					<TablePagination
						component="div"
						count={dataLength}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={(_e, pageIndex) => changePage(pageIndex)}
						onRowsPerPageChange={(e) => changeRowsPerPage(Number(e.target.value))}
						labelRowsPerPage="Linhas por página"
						labelDisplayedRows={({ from, to, count }) => {
							return `${from} a ${to} de ${count}`
						}}
						showLastButton
						showFirstButton
						rowsPerPageOptions={[5, 10, 20, 50, 100]}
					/>
				)}

				{data.length === 0 && !isLoading && !isLoading && <TableNoDataWarning />}

				{isLoading && <TablePaginationSkeleton mt={2} />}
			</TableContainer>
		</Stack>
	)
}

export default Table
