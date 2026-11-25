import { PaginationFilters } from "../../pagination/paginationFilters";

export interface PhysicalCashAssetFilters extends PaginationFilters {
  assetName?: string;
  currency?: string;
  minValue?: number;
  maxValue?: number;
}