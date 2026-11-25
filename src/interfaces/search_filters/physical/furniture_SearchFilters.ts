import { PaginationFilters } from "../../pagination/paginationFilters";

export interface FurnitureAssetFilters extends PaginationFilters {
  assetName?: string;
  brand?: string;
  material?: string;
  description?: string;
  currency?: string;
  minValue?: number;
  maxValue?: number;
}