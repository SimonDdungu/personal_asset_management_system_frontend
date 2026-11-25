import { PaginationFilters } from "../../pagination/paginationFilters";

export interface SavingsAssetFilters extends PaginationFilters {
  assetName?: string;
  institution?: string;
  accountNumber?: string;
  minInterestRate?: number;
  maxInterestRate?: number;
  minMaturityDate?: string;
  maxMaturityDate?: string;
  currency?: string;
  minValue?: number;
  maxValue?: number;
}