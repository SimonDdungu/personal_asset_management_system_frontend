import { CreateAssetsRequest } from "../assetTypes";
import { AssetDocumentUploadResponse, CreateAssetDocumentRequest } from "../asset_files/assetDocumentTypes";
import { AssetImageResponse, AssetImageUploadResponse, CreateAssetImageRequest } from "../asset_files/assetImageTypes";

export interface CreateCollectiblesValuablesRequest {
    asset: CreateAssetsRequest;
    images?: CreateAssetImageRequest;
    documents?: CreateAssetDocumentRequest;
    creator?: string;
    serialNumber?: string;
    material?: string;
    year?: number;
}

export interface UpdateCollectiblesValuablesRequest {
    creator?: string;
    serialNumber?: string;
    material?: string;
    year?: number;
}

export interface CollectiblesValuablesResponse {
    id: string;
    assetId: string;
    assetName: string;
    acquisition: string;
    assetType: string;
    assetCategory: string;
    creator?: string;
    serialNumber?: string;
    material?: string;
    year?: number;
    currency: string;
    currentValue: number;
    currentValueUpdatedAt: string;
    images?: AssetImageUploadResponse[];
    documents?: AssetDocumentUploadResponse[];
    createdAt: string;
    updatedAt: string;
}

export interface CollectiblesValuablesSearchResponse {
    id: string;
    assetId: string;
    assetName: string;
    creator?: string;
    serialNumber?: string;
    material?: string;
    year?: number;
    image?: AssetImageResponse;
    currency: string;
    currentValue: number;
}