import { CreateAssetsRequest } from "../assetTypes";
import { AssetDocumentUploadResponse, CreateAssetDocumentRequest } from "../asset_files/assetDocumentTypes";

export interface CreateRetirementFundRequest {
    asset: CreateAssetsRequest;
    documents?: CreateAssetDocumentRequest;
    provider: string;
}

export interface UpdateRetirementFundRequest {
    provider?: string;
}

export interface RetirementFundResponse {
    id: string;
    assetId: string;
    assetName: string;
    acquisition: string;
    assetType: string;
    assetCategory: string;
    description?: string;
    provider: string;
    currency: string;
    currentValue: number;
    currentValueUpdatedAt: string;
    documents?: AssetDocumentUploadResponse[];
    createdAt: string;
    updatedAt: string;
}

export interface RetirementFundSearchResponse {
    id: string;
    assetId: string;
    assetName: string;
    provider: string;
    currency: string;
    currentValue: number;
}