import { PropertySizeUnitTypes } from "@/src/constants/symbols/propertySizeUnitLabels";
import { AssetDocumentUploadResponse } from "../asset_files/assetDocumentTypes";
import { AssetImageResponse, AssetImageUploadResponse } from "../asset_files/assetImageTypes";

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

export interface RealEstateResponse {
    id: string;
    assetId: string;
    assetName: string;
    acquisition: string;
    assetType: string;
    assetCategory: string;
    address: string;
    description: string;
    numberBedrooms: number;
    numberBathrooms: number;
    numberUnits: number;
    propertySize: number;
    propertySizeUnit: PropertySizeUnitTypes;
    constructionCostCurrency: string;
    constructionCost: number;
    constructionCompletionDate: string;
    rentalIncomeCurrency: string;
    rentalIncome: number;
    currency: string;
    currentValue: number;
    currentValueUpdatedAt: string;
    images: AssetImageUploadResponse[];
    documents: AssetDocumentUploadResponse[];
    createdAt: string;
    updatedAt: string;
}

export interface RealEstateSearchResponse {
    id: string;
    assetId: string;
    assetName: string;
    address: string;
    numberBedrooms: number;
    numberBathrooms: number;
    numberUnits: number;
    propertySize: number;
    propertySizeUnit: PropertySizeUnitTypes;
    image: AssetImageResponse;
    currency: string;
    currentValue: number;
}