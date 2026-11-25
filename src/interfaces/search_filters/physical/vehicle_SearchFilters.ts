import { PaginationFilters } from "../../pagination/paginationFilters";

export interface VehicleAssetFilters extends PaginationFilters {
  assetName?: string;
  make?: string;
  model?: string;
  minYear?: number;
  maxYear?: number;
  color?: string;
  minMileage?: number;
  maxMileage?: number;
  registrationNumber?: string;
  vin?: string;
  currency?: string;
  minValue?: number;
  maxValue?: number;
}