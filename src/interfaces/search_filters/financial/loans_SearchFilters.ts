import { PaginationFilters } from "../../pagination/paginationFilters";

export interface LoansAssetFilters extends PaginationFilters {
  assetName?: string;
  lender?: string;
  minOriginalAmount?: number;
  maxOriginalAmount?: number;
  minInterestRate?: number;
  maxInterestRate?: number;
  minStartDate?: string;
  maxStartDate?: string;
  minMaturityDate?: string;
  maxMaturityDate?: string;
  currency?: string;
  minValue?: number;
  maxValue?: number;
}