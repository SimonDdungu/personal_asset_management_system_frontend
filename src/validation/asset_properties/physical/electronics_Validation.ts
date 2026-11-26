import { z } from "zod";

export const createElectronicsSchema = z.object({
    brand: z.string("Brand is required!").min(1, "Brand is required!").max(255, "Brand exceeds limit."),
    model: z.string().max(255, "Model exceeds limit.").optional(),
    serialNumber: z.string().max(255, "Serial number exceeds limit.").optional(),
    color: z.string().max(255, "Color exceeds limit.").optional(),
    year: z.number().int().min(1900, "Year must be at least 1900").max(new Date().getFullYear() + 2, "Year is too far in the future").nullable().optional(),
});

export type CreateElectronicsFormData = z.infer<typeof createElectronicsSchema>;

export const updateElectronicsSchema = z.object({
    brand: z.string().max(255, "Brand exceeds limit.").optional(),
    model: z.string().max(255, "Model exceeds limit.").optional(),
    serialNumber: z.string().max(255, "Serial number exceeds limit.").optional(),
    color: z.string().max(255, "Color exceeds limit.").optional(),
    year: z.number().int().min(1900, "Year must be at least 1900").max(new Date().getFullYear() + 2, "Year is too far in the future").nullable().optional(),
});

export type UpdateElectronicsFormData = z.infer<typeof updateElectronicsSchema>;