import { z } from "zod";
import { createAssetSchema } from "../asset_Validation";

export const createLiabilitySchema = z.object({
    asset: createAssetSchema,
    creditor: z.string("Creditor is required!").min(1, "Creditor is required!").max(255, "Creditor exceeds limit."),
    dueDate: z.string("Due date is required!").min(1, "Due date is required!"),
    description: z.string().max(255, "Description exceeds limit.").optional(),
});

export type CreateLiabilityFormData = z.infer<typeof createLiabilitySchema>;

export const updateLiabilitySchema = z.object({
    creditor: z.string().max(255, "Creditor exceeds limit.").optional(),
    dueDate: z.string().optional(),
    description: z.string().max(255, "Description exceeds limit.").optional(),
});

export type UpdateLiabilityFormData = z.infer<typeof updateLiabilitySchema>;