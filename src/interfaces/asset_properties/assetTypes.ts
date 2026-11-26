export interface CreateAssetsRequest {
    name: string;
    assetType: string;
    assetCategory: string;
    acquisition: string;
    currency: string;
    currentValue: number;
}

export interface UpdateAssetsRequest {
    name?: string;
    acquisition?: string;
    currency?: string;
    currentValue?: number;
}

export interface AssetsResponse {
    name: string;
    assetType: string;
    assetCategory: string;
    acquisition: string;
    description?: string;
    currency: string;
    currentValue: number;
}