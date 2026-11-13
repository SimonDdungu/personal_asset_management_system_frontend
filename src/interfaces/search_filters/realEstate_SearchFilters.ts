export interface RealEstateAssetFilters {
  assetName?: string;
  address?: string;

  minNumberBedrooms?: number;
  maxNumberBedrooms?: number;

  minNumberBathrooms?: number;
  maxNumberBathrooms?: number;

  minNumberUnits?: number;
  maxNumberUnits?: number;

  minPropertySize?: number;
  maxPropertySize?: number;

  propertySizeUnit?: string;

  constructionCostCurrency?: string;
  minConstructionCost?: number;
  maxConstructionCost?: number;

  minConstructionCompletionDate?: string;
  maxConstructionCompletionDate?: string;

  rentalIncomeCurrency?: string;
  minRentalIncome?: number;
  maxRentalIncome?: number;

  currency?: string;
  minValue?: number;
  maxValue?: number;
}