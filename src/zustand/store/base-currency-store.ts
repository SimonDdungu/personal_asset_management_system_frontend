import { create } from 'zustand'

type CurrencyStore = {
  baseCurrency: string
  setBaseCurrency: (currency: string) => void
}

export const useBaseCurrencyStore = create<CurrencyStore>((set) => ({
  baseCurrency: 'UGX',
  setBaseCurrency: (baseCurrency) => set({ baseCurrency }),
}))