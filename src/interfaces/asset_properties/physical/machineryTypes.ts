import { CreateAssetsRequest } from "../assetTypes";
import { AssetDocumentUploadResponse, CreateAssetDocumentRequest } from "../asset_files/assetDocumentTypes";
import { AssetImageResponse, AssetImageUploadResponse, CreateAssetImageRequest } from "../asset_files/assetImageTypes";

export interface CreateMachineryRequest {
    asset: CreateAssetsRequest;
    images?: CreateAssetImageRequest;
    documents?: CreateAssetDocumentRequest;
    brand?: string;
    model?: string;
    material?: string;
    year?: number;
}

export interface UpdateMachineryRequest {
    brand?: string;
    model?: string;
    material?: string;
    year?: number;
}

export interface MachineryResponse {
    id: string;
    assetId: string;
    assetName: string;
    acquisition: string;
    assetType: string;
    assetCategory: string;
    brand?: string;
    model?: string;
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

export interface MachinerySearchResponse {
    id: string;
    assetId: string;
    assetName: string;
    brand?: string;
    model?: string;
    material?: string;
    year?: number;
    image?: AssetImageResponse;
    currency: string;
    currentValue: number;
}