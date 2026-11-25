export interface CreateAssetImageRequest {
    images: File[];
    primaryImageIndex?: number;
}

export interface AssetImageResponse {
    id: string;
    imageUrl: string;
    originalFileName: string;
    isPrimary: boolean;
}

export interface AssetImageUploadResponse {
    id: string;
    assetId: string;
    uploadedAt: string;
    updatedAt: string;
    images: AssetImageResponse[];
}