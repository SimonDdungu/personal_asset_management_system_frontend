import { CreateAssetsRequest } from "../assetTypes";
import { AssetDocumentUploadResponse, CreateAssetDocumentRequest } from "../asset_files/assetDocumentTypes";

export interface CreateStocksRequest {
    asset: CreateAssetsRequest;
    documents?: CreateAssetDocumentRequest;
    tickerSymbol: string;
    numberShares: number;
    brokerage: string;
}

export interface UpdateStocksRequest {
    tickerSymbol?: string;
    numberShares?: number;
    brokerage?: string;
}

export interface StocksSearchResponse {
    id: string;
    assetId: string;
    assetName: string;
    description?: string;
    tickerSymbol: string;
    numberShares: number;
    brokerage: string;
    currency: string;
    currentValue: number;
}

export interface StocksResponse {
    id: string;
    assetId: string;
    assetName: string;
    acquisition: string;
    assetType: string;
    assetCategory: string;
    description?: string;
    tickerSymbol: string;
    numberShares: number;
    brokerage: string;
    currency: string;
    currentValue: number;
    currentValueUpdatedAt: string;
    documents?: AssetDocumentUploadResponse[];
    createdAt: string;
    updatedAt: string;
}