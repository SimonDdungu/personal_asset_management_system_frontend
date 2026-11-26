import { ReactNode } from 'react'

export interface FinancialAssetProperty {
  label: string
  value: ReactNode
}

const FinancialAssetPropertyGrid = ({fields}: {fields: FinancialAssetProperty[]}) => (
  <div className='grid grid-cols-2 gap-x-5 gap-y-3 border-b pb-5 mb-3 sm:grid-cols-[max-content_max-content_max-content] sm:gap-x-10 xl:grid-cols-[max-content_max-content_max-content_max-content_max-content]'>
    {fields.map((field) => (
      <div key={field.label} className='flex flex-col gap-y-1'>
        <span className='text-xs text-gray-700'>{field.label}</span>
        <span>{field.value}</span>
      </div>
    ))}
  </div>
)

export default FinancialAssetPropertyGrid
