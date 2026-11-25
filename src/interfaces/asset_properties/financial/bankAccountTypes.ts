import { AssetDocumentUploadResponse, CreateAssetDocumentRequest } from "../asset_files/assetDocumentTypes";

export interface CreateBankAccountRequest {
    assetId: string;
    documents?: CreateAssetDocumentRequest;
    bank: string;
    bankAccountNumber: string;
    interestRate?: number;
    currency: string;
    currentBalance: number;
    previousBalance: number;
}

export interface UpdateBankAccountRequest {
    bank?: string;
    bankAccountNumber?: string;
    interestRate?: number;
    currency?: string;
    currentBalance?: number;
}

export interface BankAccountResponse {
    id: string;
    assetId: string;
    assetName: string;
    bank: string;
    bankAccountNumber: string;
    interestRate: number;
    currency: string;
    currentBalance: number;
    previousBalance: number;
    currentBalanceUpdatedAt: string;
    documents: AssetDocumentUploadResponse[];
    createdAt: string;
    updatedAt: string;
}

export interface BankAccountSearchResponse {
    id: string;
    assetId: string;
    assetName: string;
    bank: string;
    interestRate: number;
    currency: string;
    currentBalance: number;
}