import { PaginationFilters } from "../../pagination/paginationFilters";

export interface LiabilityAssetFilters extends PaginationFilters {
  assetName?: string;
  creditor?: string;
  minDueDate?: string;
  maxDueDate?: string;
  description?: string;
  currency?: string;
  minValue?: number;
  maxValue?: number;
}