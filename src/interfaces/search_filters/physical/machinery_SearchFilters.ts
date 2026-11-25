import { PaginationFilters } from "../../pagination/paginationFilters";

export interface MachineryAssetFilters extends PaginationFilters {
  assetName?: string;
  brand?: string;
  model?: string;
  material?: string;
  minYear?: number;
  maxYear?: number;
  currency?: string;
  minValue?: number;
  maxValue?: number;
}