import { CreateAssetsRequest } from "../assetTypes";
import { AssetDocumentUploadResponse, CreateAssetDocumentRequest } from "../asset_files/assetDocumentTypes";

export interface CreatePhysicalCashRequest {
    asset: CreateAssetsRequest;
    documents?: CreateAssetDocumentRequest;
}

export interface PhysicalCashResponse {
    id: string;
    assetId: string;
    assetName: string;
    acquisition: string;
    assetType: string;
    assetCategory: string;
    description?: string;
    currency: string;
    currentValue: number;
    currentValueUpdatedAt: string;
    documents?: AssetDocumentUploadResponse[];
    createdAt: string;
    updatedAt: string;
}

export interface PhysicalCashSearchResponse {
    id: string;
    assetId: string;
    assetName: string;
    currency: string;
    currentValue: number;
}