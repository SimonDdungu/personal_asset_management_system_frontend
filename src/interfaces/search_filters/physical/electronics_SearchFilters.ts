import { PaginationFilters } from "../../pagination/paginationFilters";

export interface ElectronicsAssetFilters extends PaginationFilters {
  assetName?: string;
  brand?: string;
  model?: string;
  serialNumber?: string;
  color?: string;
  minYear?: number;
  maxYear?: number;
  currency?: string;
  minValue?: number;
  maxValue?: number;
}