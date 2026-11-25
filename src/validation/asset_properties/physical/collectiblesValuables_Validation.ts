import { z } from "zod";
import { createAssetSchema } from "../asset_Validation";

export const createCollectiblesValuablesSchema = z.object({
    asset: createAssetSchema,
    creator: z.string().max(255, "Creator exceeds limit.").optional(),
    serialNumber: z.string().max(255, "Serial number exceeds limit.").optional(),
    material: z.string().max(255, "Material exceeds limit.").optional(),
    year: z.number().int().min(1900, "Year must be at least 1900").max(new Date().getFullYear() + 2, "Year is too far in the future").optional(),
});

export type CreateCollectiblesValuablesFormData = z.infer<typeof createCollectiblesValuablesSchema>;

export const updateCollectiblesValuablesSchema = z.object({
    creator: z.string().max(255, "Creator exceeds limit.").optional(),
    serialNumber: z.string().max(255, "Serial number exceeds limit.").optional(),
    material: z.string().max(255, "Material exceeds limit.").optional(),
    year: z.number().int().min(1900, "Year must be at least 1900").max(new Date().getFullYear() + 2, "Year is too far in the future").optional(),
});

export type UpdateCollectiblesValuablesFormData = z.infer<typeof updateCollectiblesValuablesSchema>;