import { PaginationFilters } from "../../pagination/paginationFilters";

export interface InsuranceAssetFilters extends PaginationFilters {
  assetName?: string;
  provider?: string;
  minPremiumAmount?: number;
  maxPremiumAmount?: number;
  premiumFrequency?: string;
  minStartDate?: string;
  maxStartDate?: string;
  minEndDate?: string;
  maxEndDate?: string;
  currency?: string;
  minValue?: number;
  maxValue?: number;
}