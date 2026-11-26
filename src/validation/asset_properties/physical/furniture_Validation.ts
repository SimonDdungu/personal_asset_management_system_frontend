import { z } from "zod";

export const createFurnitureSchema = z.object({
    brand: z.string().max(255, "Brand exceeds limit.").optional(),
    material: z.string().max(255, "Material exceeds limit.").optional(),
});

export type CreateFurnitureFormData = z.infer<typeof createFurnitureSchema>;

export const updateFurnitureSchema = z.object({
    brand: z.string().max(255, "Brand exceeds limit.").optional(),
    material: z.string().max(255, "Material exceeds limit.").optional(),
});

export type UpdateFurnitureFormData = z.infer<typeof updateFurnitureSchema>;