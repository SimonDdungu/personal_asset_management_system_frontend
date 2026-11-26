import { CreateAssetsRequest } from "../assetTypes";
import { AssetDocumentUploadResponse, CreateAssetDocumentRequest } from "../asset_files/assetDocumentTypes";
import { AssetImageResponse, AssetImageUploadResponse, CreateAssetImageRequest } from "../asset_files/assetImageTypes";

export interface CreateLandRequest {
    asset: CreateAssetsRequest;
    images?: CreateAssetImageRequest;
    documents?: CreateAssetDocumentRequest;
    address: string;
    plotNumber: string;
    landSize: number;
    landSizeUnit: string;
}

export interface UpdateLandRequest {
    address?: string;
    plotNumber?: string;
    landSize?: number | null;
    landSizeUnit?: string;
}

export interface LandResponse {
    id: string;
    assetId: string;
    assetName: string;
    acquisition: string;
    assetType: string;
    assetCategory: string;
    address: string;
    description?: string;
    plotNumber: string;
    landSize: number;
    landSizeUnit: string;
    currency: string;
    currentValue: number;
    currentValueUpdatedAt: string;
    images?: AssetImageUploadResponse[];
    documents?: AssetDocumentUploadResponse[];
    createdAt: string;
    updatedAt: string;
}

export interface LandSearchResponse {
    id: string;
    assetId: string;
    assetName: string;
    address: string;
    plotNumber: string;
    landSize: number;
    landSizeUnit: string;
    image?: AssetImageResponse;
    currency: string;
    currentValue: number;
}