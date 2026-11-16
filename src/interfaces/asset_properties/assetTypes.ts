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