import { CreateAssetsRequest } from "../assetTypes";
import { CreateAssetDocumentRequest } from "../asset_files/assetDocumentTypes";

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
    tickerSymbol: string;
    numberShares: number;
    brokerage: string;
    currency: string;
    currentValue: number;
}