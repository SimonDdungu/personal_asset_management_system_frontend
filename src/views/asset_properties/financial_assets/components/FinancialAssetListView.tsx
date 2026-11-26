"use client"
import { LegacyColumnDef } from '@tanstack/react-table/legacy'
import { BlueButton, TextSearchInput, WhiteButton } from '@/src/components/ui'
import NumberSearchInput from '@/src/components/ui/input/NumberSearchInput'
import AssetResultsLoadingSpinner from '@/src/components/ui/loading_state/AssetResultsLoadingSpinner'
import Pagination from '@/src/components/ui/pagination/Pagination'
import { PaginatedResponse } from '@/src/interfaces/pagination/pagination-response'
import { CircleX, Search } from 'lucide-react'
import FinancialAssetsTable, { FinancialAssetTableRow } from './FinancialAssetsTable'

export interface FinancialAssetSearchField {
  kind: 'text' | 'number'
  name: string
  label: string
  placeholder: string
  value: string | number
  onChange: (value: string | number | undefined) => void
}

interface FinancialAssetListViewProps<TData extends FinancialAssetTableRow> {
  title: string
  basePath: string
  fields: FinancialAssetSearchField[]
  columns: LegacyColumnDef<TData>[]
  data?: PaginatedResponse<TData>
  isLoading: boolean
  isFetching: boolean
  page: number
  onPageChange: (page: number) => void
  onSearch: () => void
  onClear: () => void
}

const FinancialAssetListView = <TData extends FinancialAssetTableRow>({
  title,
  basePath,
  fields,
  columns,
  data,
  isLoading,
  isFetching,
  page,
  onPageChange,
  onSearch,
  onClear,
}: FinancialAssetListViewProps<TData>) => (
  <div className='px-10 py-10'>
    <h1 className='mb-2 pb-2 border-b'>All {title}</h1>

    <div className='mb-5 border-b pt-2 pb-4'>
      <div className='mb-2 flex flex-row flex-wrap items-center gap-x-5'>
        {fields.map((field) => (
          field.kind === 'text'
            ? <TextSearchInput
                key={field.name}
                name={field.name}
                label={field.label}
                placeholder={field.placeholder}
                value={String(field.value ?? '')}
                onChange={field.onChange}
              />
            : <NumberSearchInput
                key={field.name}
                name={field.name}
                label={field.label}
                placeholder={field.placeholder}
                value={field.value}
                onChange={field.onChange}
              />
        ))}
      </div>

      <div className='flex items-center justify-between gap-x-5'>
        <span>Results: {data?.totalElements ?? '0'}</span>
        <div className='flex items-center gap-x-3'>
          <BlueButton label='Search' icon={Search} onClick={onSearch}/>
          <WhiteButton label='Clear' onClick={onClear}/>
        </div>
      </div>
    </div>

    <div className='relative pt-4'>
      {isLoading || isFetching
        ? <AssetResultsLoadingSpinner />
        : (data?.content?.length ?? 0) > 0
          ? <div>
              <FinancialAssetsTable
                columns={columns}
                data={data?.content ?? []}
                basePath={basePath}
              />
              <div className='mt-20'>
                <Pagination
                  page={data?.number ?? page}
                  totalPages={data?.totalPages ?? 0}
                  first={data?.first ?? true}
                  last={data?.last ?? true}
                  onPageChange={onPageChange}
                />
              </div>
            </div>
          : <div className='mx-auto flex h-100 w-max flex-col items-center justify-center gap-y-2'>
              <CircleX />
              <span className='text-center text-sm'>No results available</span>
            </div>
      }
    </div>
  </div>
)

export default FinancialAssetListView
