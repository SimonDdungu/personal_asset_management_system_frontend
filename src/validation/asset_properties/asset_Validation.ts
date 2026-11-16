import { z } from "zod";
import { maxMoneyValue } from "@/src/constants/asset_properties/maxMoneyValue";
import currencyCodes from "currency-codes";

export const createAssetSchema = z.object({
    name: z.string().min(2, "Name of asset is required!").max(255, "Name of asset exceeds limit."),
    assetType: z.string().min(5, "Asset Type is required!"),
    assetCategory: z.string().min(3, "Asset Category is required!"),
    description: z.string().max(255, "Description exceeds limit.").nullable().optional(),
    acquisition: z.string().min(4, "Acquisition is required!"),
    currency: z.string().refine((value) => currencyCodes.code(value) !== undefined, "Invalid Currency"),
    currentValue: z.number().min(0, "Current value cannot be negative.").max(maxMoneyValue, "Current value exceeds limit."),
});

export type CreateAssetFormData = z.infer<typeof createAssetSchema>;

export const updateAssetSchema = z.object({
    name: z.string().min(1, "Name of asset is required!").max(255, "Name of asset exceeds limit.").optional(),
    description: z.string().max(255, "Description exceeds limit.").nullable().optional(),
    acquisition: z.string().min(4, "Acquisition is required!"),
    currency: z.string().refine((value) => currencyCodes.code(value) !== undefined, "Invalid Currency"),
    currentValue: z.number().min(0, "Current value cannot be negative.").max(maxMoneyValue, "Current value exceeds limit.").optional(),
});

export type UpdateAssetFormData = z.infer<typeof updateAssetSchema>;