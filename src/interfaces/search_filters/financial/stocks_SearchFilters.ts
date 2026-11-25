import { PaginationFilters } from "../../pagination/paginationFilters";

export interface StocksAssetFilters extends PaginationFilters {
  assetName?: string;
  tickerSymbol?: string;
  minNumberShares?: number;
  maxNumberShares?: number;
  brokerage?: string;
  currency?: string;
  minValue?: number;
  maxValue?: number;
}