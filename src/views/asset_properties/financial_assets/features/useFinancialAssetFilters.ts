"use client"
import { useState } from 'react'

type FilterValue = string | number | undefined

const removeEmptyValues = <TFilters extends object>(filters: Partial<TFilters>): Partial<TFilters> =>
  Object.fromEntries(
    Object.entries(filters).filter((entry) => {
      const value = entry[1]
      if (value === undefined || value === null) return false
      if (typeof value === "string" && !value.trim()) return false
      return true
    })
  ) as Partial<TFilters>

export const useFinancialAssetFilters = <TFilters extends object>() => {
  const [searchFilters, setSearchFilters] = useState<Partial<TFilters>>({})
  const [appliedFilters, setAppliedFilters] = useState<Partial<TFilters>>({})
  const [page, setPage] = useState(0)

  const handleFilterChange = (key: keyof TFilters, value: FilterValue) => {
    setSearchFilters((previous) => ({...previous, [key]: value}) as Partial<TFilters>)
  }

  const searchRecords = () => {
    setAppliedFilters(removeEmptyValues(searchFilters))
  }

  const clearFilters = () => {
    if (Object.keys(searchFilters).length > 0) setSearchFilters({})
    if (Object.keys(appliedFilters).length > 0) setAppliedFilters({})
  }

  return {
    searchFilters,
    appliedFilters,
    page,
    setPage,
    handleFilterChange,
    searchRecords,
    clearFilters,
  }
}
