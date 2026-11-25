import { PaginationFilters } from "../../pagination/paginationFilters";

export interface CollectiblesValuablesAssetFilters extends PaginationFilters {
  assetName?: string;
  creator?: string;
  serialNumber?: string;
  material?: string;
  minYear?: number;
  maxYear?: number;
  currency?: string;
  minValue?: number;
  maxValue?: number;
}