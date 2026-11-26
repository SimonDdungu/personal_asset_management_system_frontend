import { CreateAssetsRequest } from "../assetTypes";
import { AssetDocumentUploadResponse, CreateAssetDocumentRequest } from "../asset_files/assetDocumentTypes";

export interface CreateLoansRequest {
    asset: CreateAssetsRequest;
    documents?: CreateAssetDocumentRequest;
    lender: string;
    originalAmount: number;
    interestRate?: number;
    startDate: string;
    maturityDate?: string;
}

export interface UpdateLoansRequest {
    lender?: string;
    originalAmount?: number;
    interestRate?: number;
    startDate?: string;
    maturityDate?: string;
}

export interface LoansResponse {
    id: string;
    assetId: string;
    assetName: string;
    acquisition: string;
    assetType: string;
    assetCategory: string;
    description?: string;
    lender: string;
    originalAmount: number;
    interestRate?: number;
    startDate: string;
    maturityDate?: string;
    currency: string;
    currentValue: number;
    currentValueUpdatedAt: string;
    documents: AssetDocumentUploadResponse[];
    createdAt: string;
    updatedAt: string;
}

export interface LoansSearchResponse {
    id: string;
    assetId: string;
    assetName: string;
    lender: string;
    originalAmount: number;
    interestRate?: number;
    maturityDate?: string;
    currency: string;
    currentValue: number;
}