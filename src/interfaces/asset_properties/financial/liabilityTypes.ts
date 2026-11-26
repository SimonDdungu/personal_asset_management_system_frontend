import { CreateAssetsRequest } from "../assetTypes";
import { AssetDocumentUploadResponse, CreateAssetDocumentRequest } from "../asset_files/assetDocumentTypes";

export interface CreateLiabilityRequest {
    asset: CreateAssetsRequest;
    documents?: CreateAssetDocumentRequest;
    creditor: string;
    dueDate: string;
    description?: string;
}

export interface UpdateLiabilityRequest {
    creditor?: string;
    dueDate?: string;
    description?: string;
}

export interface LiabilityResponse {
    id: string;
    assetId: string;
    assetName: string;
    acquisition: string;
    assetType: string;
    assetCategory: string;
    creditor: string;
    dueDate: string;
    description?: string;
    currency: string;
    currentValue: number;
    currentValueUpdatedAt: string;
    documents?: AssetDocumentUploadResponse[];
    createdAt: string;
    updatedAt: string;
}

export interface LiabilitySearchResponse {
    id: string;
    assetId: string;
    assetName: string;
    creditor: string;
    dueDate: string;
    currency: string;
    currentValue: number;
}