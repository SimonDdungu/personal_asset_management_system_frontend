import currencyCodes from "currency-codes";

export const currencyOptions = currencyCodes.data.map((currency) => ({
  label: `${currency.code} - ${currency.currency}`,
  value: currency.code,
}));