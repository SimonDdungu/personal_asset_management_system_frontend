import { PaginationFilters } from "../../pagination/paginationFilters";

export interface RetirementFundAssetFilters extends PaginationFilters {
  assetName?: string;
  provider?: string;
  currency?: string;
  minValue?: number;
  maxValue?: number;
}