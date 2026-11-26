import { CreateAssetsRequest } from "../assetTypes";
import { AssetDocumentUploadResponse, CreateAssetDocumentRequest } from "../asset_files/assetDocumentTypes";
import { AssetImageResponse, AssetImageUploadResponse, CreateAssetImageRequest } from "../asset_files/assetImageTypes";

export interface CreateVehicleRequest {
    asset: CreateAssetsRequest;
    images?: CreateAssetImageRequest;
    documents?: CreateAssetDocumentRequest;
    make: string;
    model: string;
    year: number;
    color: string;
    mileage?: number;
    registrationNumber?: string;
    vin?: string;
}

export interface UpdateVehicleRequest {
    make?: string;
    model?: string;
    year?: number;
    color?: string;
    mileage?: number;
    registrationNumber?: string;
    vin?: string;
}

export interface VehicleResponse {
    id: string;
    assetId: string;
    assetName: string;
    acquisition: string;
    assetType: string;
    assetCategory: string;
    make: string;
    model: string;
    year: number;
    color: string;
    mileage?: number;
    registrationNumber?: string;
    vin?: string;
    currency: string;
    currentValue: number;
    currentValueUpdatedAt: string;
    images?: AssetImageUploadResponse[];
    documents?: AssetDocumentUploadResponse[];
    createdAt: string;
    updatedAt: string;
}

export interface VehicleSearchResponse {
    id: string;
    assetId: string;
    assetName: string;
    make: string;
    model: string;
    year: number;
    color: string;
    mileage?: number;
    image?: AssetImageResponse;
    currency: string;
    currentValue: number;
}