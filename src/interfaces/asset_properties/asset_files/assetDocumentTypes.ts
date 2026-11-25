export interface CreateAssetDocumentRequest {
    assetDocumentTypeName: string;
    documents: File[];
}

export interface AssetDocumentResponse {
    id: string;
    documentUrl: string;
    originalFileName: string;
}

export interface AssetDocumentUploadResponse {
    id: string;
    assetId: string;
    assetDocumentTypeId: string;
    assetDocumentTypeName: string;
    uploadedAt: string;
    updatedAt: string;
    documents: AssetDocumentResponse[];
}