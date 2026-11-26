import { CreateAssetsRequest } from "../assetTypes";
import { AssetDocumentUploadResponse, CreateAssetDocumentRequest } from "../asset_files/assetDocumentTypes";

export interface CreateSavingsRequest {
    asset: CreateAssetsRequest;
    documents?: CreateAssetDocumentRequest;
    institution: string;
    accountNumber: string;
    interestRate?: number;
    maturityDate?: string;
}

export interface UpdateSavingsRequest {
    institution?: string;
    accountNumber?: string;
    interestRate?: number;
    maturityDate?: string;
}

export interface SavingsResponse {
    id: string;
    assetId: string;
    assetName: string;
    acquisition: string;
    assetType: string;
    assetCategory: string;
    institution: string;
    accountNumber: string;
    interestRate?: number;
    maturityDate?: string;
    currency: string;
    currentValue: number;
    currentValueUpdatedAt: string;
    documents: AssetDocumentUploadResponse[];
    createdAt: string;
    updatedAt: string;
}

export interface SavingsSearchResponse {
    id: string;
    assetId: string;
    assetName: string;
    institution: string;
    interestRate?: number;
    maturityDate?: string;
    currency: string;
    currentValue: number;
}