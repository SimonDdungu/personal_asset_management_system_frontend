import { PropertySizeUnitTypes } from "@/src/constants/symbols/propertySizeUnitLabels";

export interface CreateRealEstateRequest {
    address: string;
    description?: string;
    numberBedrooms: number;
    numberBathrooms: number;
    numberUnits?: number;
    propertySize?: number;
    propertySizeUnit?: PropertySizeUnitTypes;
    constructionCostCurrency?: string;
    constructionCost?: number;
    constructionCompletionDate?: string;
    rentalIncomeCurrency?: string;
    rentalIncome?: number;
}

export interface UpdateRealEstateRequest {
    address?: string;
    description?: string;
    numberBedrooms?: number;
    numberBathrooms?: number;
    numberUnits?: number;
    propertySize?: number;
    propertySizeUnit?: PropertySizeUnitTypes;
    constructionCostCurrency?: string;
    constructionCost?: number;
    constructionCompletionDate?: string;
    rentalIncomeCurrency?: string;
    rentalIncome?: number;
}