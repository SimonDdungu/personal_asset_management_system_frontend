import { CreateAssetsRequest } from "../assetTypes";
import { AssetDocumentUploadResponse, CreateAssetDocumentRequest } from "../asset_files/assetDocumentTypes";

export interface CreateInvestmentRequest {
    asset: CreateAssetsRequest;
    documents?: CreateAssetDocumentRequest;
    quantity: number;
    institution?: string;
    interestRate?: number;
    referenceNumber?: string;
}

export interface UpdateInvestmentRequest {
    quantity?: number;
    institution?: string;
    interestRate?: number;
    referenceNumber?: string;
}

export interface InvestmentResponse {
    id: string;
    assetId: string;
    assetName: string;
    acquisition: string;
    assetType: string;
    assetCategory: string;
    quantity: number;
    institution: string;
    interestRate: number;
    referenceNumber: string;
    currency: string;
    currentValue: number;
    currentValueUpdatedAt: string;
    documents: AssetDocumentUploadResponse[];
    createdAt: string;
    updatedAt: string;
}

export interface InvestmentSearchResponse {
    id: string;
    assetId: string;
    assetName: string;
    quantity: number;
    institution: string;
    interestRate: number;
    currency: string;
    currentValue: number;
}