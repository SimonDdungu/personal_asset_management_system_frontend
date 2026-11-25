import { PaginationFilters } from "../../pagination/paginationFilters";

export interface LandAssetFilters extends PaginationFilters {
  assetName?: string;
  address?: string;
  description?: string;
  plotNumber?: string;
  minLandSize?: number;
  maxLandSize?: number;
  landSizeUnit?: string;
  currency?: string;
  minValue?: number;
  maxValue?: number;
}