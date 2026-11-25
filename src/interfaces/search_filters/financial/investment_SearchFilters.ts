import { PaginationFilters } from "../../pagination/paginationFilters";

export interface InvestmentAssetFilters extends PaginationFilters {
  assetName?: string;
  minQuantity?: number;
  maxQuantity?: number;
  institution?: string;
  minInterestRate?: number;
  maxInterestRate?: number;
  referenceNumber?: string;
  currency?: string;
  minValue?: number;
  maxValue?: number;
}