import { z } from "zod";

export const createMachinerySchema = z.object({
    brand: z.string().max(255, "Brand exceeds limit.").optional(),
    model: z.string().max(255, "Model exceeds limit.").optional(),
    material: z.string().max(255, "Material exceeds limit.").optional(),
    year: z.number().int().min(1900, "Year must be at least 1900").max(new Date().getFullYear() + 2, "Year is too far in the future").nullable().optional(),
});

export type CreateMachineryFormData = z.infer<typeof createMachinerySchema>;

export const updateMachinerySchema = z.object({
    brand: z.string().max(255, "Brand exceeds limit.").optional(),
    model: z.string().max(255, "Model exceeds limit.").optional(),
    material: z.string().max(255, "Material exceeds limit.").optional(),
    year: z.number().int().min(1900, "Year must be at least 1900").max(new Date().getFullYear() + 2, "Year is too far in the future").nullable().optional(),
});

export type UpdateMachineryFormData = z.infer<typeof updateMachinerySchema>;