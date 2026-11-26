import { CreateAssetsRequest } from "../assetTypes";
import { AssetDocumentUploadResponse, CreateAssetDocumentRequest } from "../asset_files/assetDocumentTypes";
import { AssetImageResponse, AssetImageUploadResponse, CreateAssetImageRequest } from "../asset_files/assetImageTypes";

export interface CreateFurnitureRequest {
    asset: CreateAssetsRequest;
    images?: CreateAssetImageRequest;
    documents?: CreateAssetDocumentRequest;
    brand?: string;
    material?: string;
}

export interface UpdateFurnitureRequest {
    brand?: string;
    material?: string;
}

export interface FurnitureResponse {
    id: string;
    assetId: string;
    assetName: string;
    acquisition: string;
    assetType: string;
    assetCategory: string;
    description?: string;
    brand?: string;
    material?: string;
    currency: string;
    currentValue: number;
    currentValueUpdatedAt: string;
    images?: AssetImageUploadResponse[];
    documents?: AssetDocumentUploadResponse[];
    createdAt: string;
    updatedAt: string;
}

export interface FurnitureSearchResponse {
    id: string;
    assetId: string;
    assetName: string;
    brand?: string;
    material?: string;
    image?: AssetImageResponse;
    currency: string;
    currentValue: number;
}