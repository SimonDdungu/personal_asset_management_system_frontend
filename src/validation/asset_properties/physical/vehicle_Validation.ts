import { z } from "zod";

export const createVehicleSchema = z.object({
    make: z.string("Make is required!").min(1, "Make is required!").max(255, "Make exceeds limit."),
    model: z.string("Model is required!").min(1, "Model is required!").max(255, "Model exceeds limit."),
    year: z.number("Year is required!").int().min(1900, "Year must be at least 1900").max(new Date().getFullYear() + 2, "Year is too far in the future"),
    color: z.string("Color is required!").min(1, "Color is required!").max(255, "Color exceeds limit."),
    mileage: z.number().int().min(0, "Mileage cannot be less than 0.").optional(),
    registrationNumber: z.string().max(255, "Registration number exceeds limit.").optional(),
    vin: z.string().max(255, "VIN exceeds limit.").optional(),
});

export type CreateVehicleFormData = z.infer<typeof createVehicleSchema>;

export const updateVehicleSchema = z.object({
    make: z.string().max(255, "Make exceeds limit.").optional(),
    model: z.string().max(255, "Model exceeds limit.").optional(),
    year: z.number().int().min(1900, "Year must be at least 1900").max(new Date().getFullYear() + 2, "Year is too far in the future").optional(),
    color: z.string().max(255, "Color exceeds limit.").optional(),
    mileage: z.number().int().min(0, "Mileage cannot be less than 0.").optional(),
    registrationNumber: z.string().max(255, "Registration number exceeds limit.").optional(),
    vin: z.string().max(255, "VIN exceeds limit.").optional(),
});

export type UpdateVehicleFormData = z.infer<typeof updateVehicleSchema>;