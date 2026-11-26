export const formatFinancialNumber = (value: number) =>
  value.toLocaleString("en-US", {maximumFractionDigits: 2})

export const formatOptionalFinancialNumber = (value: number | null | undefined) =>
  typeof value === "number" ? formatFinancialNumber(value) : "-"
