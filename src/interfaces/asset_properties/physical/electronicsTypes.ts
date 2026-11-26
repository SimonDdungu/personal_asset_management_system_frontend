import { CreateAssetsRequest } from "../assetTypes";
import { AssetDocumentUploadResponse, CreateAssetDocumentRequest } from "../asset_files/assetDocumentTypes";
import { AssetImageResponse, AssetImageUploadResponse, CreateAssetImageRequest } from "../asset_files/assetImageTypes";

export interface CreateElectronicsRequest {
    asset: CreateAssetsRequest;
    images?: CreateAssetImageRequest;
    documents?: CreateAssetDocumentRequest;
    brand: string;
    model?: string;
    serialNumber?: string;
    color?: string;
    year?: number;
}

export interface UpdateElectronicsRequest {
    brand?: string;
    model?: string;
    serialNumber?: string;
    color?: string;
    year?: number | null;
}

export interface ElectronicsResponse {
    id: string;
    assetId: string;
    assetName: string;
    acquisition: string;
    assetType: string;
    assetCategory: string;
    description?: string;
    brand: string;
    model?: string;
    serialNumber?: string;
    color?: string;
    year?: number;
    currency: string;
    currentValue: number;
    currentValueUpdatedAt: string;
    images?: AssetImageUploadResponse[];
    documents?: AssetDocumentUploadResponse[];
    createdAt: string;
    updatedAt: string;
}

export interface ElectronicSearchResponse {
    id: string;
    assetId: string;
    assetName: string;
    assetType: string;
    assetCategory: string;
    brand: string;
    model?: string;
    serialNumber?: string;
    color?: string;
    year?: number;
    image?: AssetImageResponse;
    currency: string;
    currentValue: number;
}