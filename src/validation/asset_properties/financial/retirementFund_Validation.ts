import { z } from "zod";

export const createRetirementFundSchema = z.object({
    provider: z.string("Provider is required!").min(1, "Provider is required!").max(255, "Provider exceeds limit."),
});

export type CreateRetirementFundFormData = z.infer<typeof createRetirementFundSchema>;

export const updateRetirementFundSchema = z.object({
    provider: z.string().max(255, "Provider exceeds limit.").optional(),
});

export type UpdateRetirementFundFormData = z.infer<typeof updateRetirementFundSchema>;