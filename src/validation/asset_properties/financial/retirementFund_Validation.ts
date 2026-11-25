import { z } from "zod";
import { createAssetSchema } from "../asset_Validation";

export const createRetirementFundSchema = z.object({
    asset: createAssetSchema,
    provider: z.string("Provider is required!").min(1, "Provider is required!").max(255, "Provider exceeds limit."),
});

export type CreateRetirementFundFormData = z.infer<typeof createRetirementFundSchema>;

export const updateRetirementFundSchema = z.object({
    provider: z.string().max(255, "Provider exceeds limit.").optional(),
});

export type UpdateRetirementFundFormData = z.infer<typeof updateRetirementFundSchema>;