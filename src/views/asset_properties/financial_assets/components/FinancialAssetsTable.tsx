"use client"
import { flexRender } from '@tanstack/react-table'
import { getCoreRowModel, LegacyColumnDef, useLegacyTable } from '@tanstack/react-table/legacy'
import AssetPopOver from '@/src/components/ui/pop_over/AssetPopOver'

export interface FinancialAssetTableRow {
  id: string
  assetName: string
}

interface FinancialAssetsTableProps<TData extends FinancialAssetTableRow> {
  columns: LegacyColumnDef<TData>[]
  data: TData[]
  basePath: string
}

const FinancialAssetsTable = <TData extends FinancialAssetTableRow>({
  columns,
  data,
  basePath,
}: FinancialAssetsTableProps<TData>) => {
  const actionsColumn: LegacyColumnDef<TData> = {
    id: 'actions',
    header: 'Actions',
    cell: ({row}) => (
      <div className='relative mx-auto h-8 w-8'>
        <AssetPopOver basePath={basePath} id={row.original.id} assetName={row.original.assetName} />
      </div>
    ),
  }

  const table = useLegacyTable({
    data,
    columns: [...columns, actionsColumn],
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className='overflow-x-auto rounded-lg border border-gray-200 bg-white'>
      <table className='min-w-full divide-y divide-gray-200 text-left text-sm'>
        <thead className='bg-gray-50'>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} scope='col' className='whitespace-nowrap px-4 py-3 font-medium text-gray-700'>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className='divide-y divide-gray-100'>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className='hover:bg-gray-50'>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className='whitespace-nowrap px-4 py-3 text-gray-800'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default FinancialAssetsTable
