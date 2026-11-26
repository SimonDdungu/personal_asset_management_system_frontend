import { z } from "zod";
import { createAssetSchema } from "../asset_Validation";

export const createFurnitureSchema = z.object({
    asset: createAssetSchema,
    brand: z.string().max(255, "Brand exceeds limit.").optional(),
    material: z.string().max(255, "Material exceeds limit.").optional(),
});

export type CreateFurnitureFormData = z.infer<typeof createFurnitureSchema>;

export const updateFurnitureSchema = z.object({
    brand: z.string().max(255, "Brand exceeds limit.").optional(),
    material: z.string().max(255, "Material exceeds limit.").optional(),
});

export type UpdateFurnitureFormData = z.infer<typeof updateFurnitureSchema>;