import { CreateAssetsRequest } from "../assetTypes";
import { AssetDocumentUploadResponse, CreateAssetDocumentRequest } from "../asset_files/assetDocumentTypes";

export interface CreateInsuranceRequest {
    asset: CreateAssetsRequest;
    documents?: CreateAssetDocumentRequest;
    provider: string;
    premiumAmount: number;
    premiumFrequency: string;
    startDate: string;
    endDate: string;
}

export interface UpdateInsuranceRequest {
    provider?: string;
    premiumAmount?: number;
    premiumFrequency?: string;
    startDate?: string;
    endDate?: string;
}

export interface InsuranceResponse {
    id: string;
    assetId: string;
    assetName: string;
    acquisition: string;
    assetType: string;
    assetCategory: string;
    provider: string;
    premiumAmount: number;
    premiumFrequency: string;
    startDate: string;
    endDate: string;
    currency: string;
    currentValue: number;
    currentValueUpdatedAt: string;
    documents: AssetDocumentUploadResponse[];
    createdAt: string;
    updatedAt: string;
}

export interface InsuranceSearchResponse {
    id: string;
    assetId: string;
    assetName: string;
    provider: string;
    premiumAmount: number;
    premiumFrequency: string;
    endDate: string;
    currency: string;
    currentValue: number;
}