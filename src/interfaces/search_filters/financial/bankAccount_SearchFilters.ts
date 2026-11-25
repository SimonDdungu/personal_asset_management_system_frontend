import { PaginationFilters } from "../../pagination/paginationFilters";

export interface BankAccountAssetFilters extends PaginationFilters {
  assetName?: string;
  bank?: string;
  bankAccountNumber?: string;
  minInterestRate?: number;
  maxInterestRate?: number;
  currency?: string;
  minValue?: number;
  maxValue?: number;
  minPreviousBalance?: number;
  maxPreviousBalance?: number;
}