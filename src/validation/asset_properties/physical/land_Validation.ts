import { z } from "zod";
import { maxPropertySize } from "@/src/constants/asset_properties/maxPropertySize";

export const createLandSchema = z.object({
    address: z.string("Address is required!").min(2, "Address is required!").max(255, "Address of land exceeds limit."),
    plotNumber: z.string("Plot number is required!").min(1, "Plot number is required!").max(255, "Plot number exceeds limit."),
    landSize: z.number("Land size is required!").min(0, "Land size cannot be negative.").max(maxPropertySize, "Land size exceeds limit."),
    landSizeUnit: z.string("Land size unit is required!").min(1, "Land size unit is required!"),
});

export type CreateLandFormData = z.infer<typeof createLandSchema>;

export const updateLandSchema = z.object({
    address: z.string().max(255, "Address of land exceeds limit.").optional(),
    plotNumber: z.string().max(255, "Plot number exceeds limit.").optional(),
    landSize: z.number().min(0, "Land size cannot be negative.").max(maxPropertySize, "Land size exceeds limit.").nullable().optional(),
    landSizeUnit: z.string().min(1, "Land size unit is required!").optional(),
});

export type UpdateLandFormData = z.infer<typeof updateLandSchema>;