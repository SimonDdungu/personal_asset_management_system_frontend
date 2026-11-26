import { z } from "zod";
import { maxMoneyValue } from "@/src/constants/asset_properties/maxMoneyValue";

const premiumAmountSchema = z.number("Premium amount is required!")
    .min(0, "Premium amount cannot be negative.")
    .max(maxMoneyValue, "Premium amount exceeds limit.");

export const createInsuranceSchema = z.object({
    provider: z.string("Provider is required!").min(1, "Provider is required!").max(255, "Provider exceeds limit."),
    premiumAmount: premiumAmountSchema,
    premiumFrequency: z.string("Premium frequency is required!").min(1, "Premium frequency is required!"),
    startDate: z.string("Start date is required!").min(1, "Start date is required!"),
    endDate: z.string("End date is required!").min(1, "End date is required!"),
});

export type CreateInsuranceFormData = z.infer<typeof createInsuranceSchema>;

export const updateInsuranceSchema = z.object({
    provider: z.string().max(255, "Provider exceeds limit.").optional(),
    premiumAmount: premiumAmountSchema.optional(),
    premiumFrequency: z.string().min(1, "Premium frequency is required!").optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
});

export type UpdateInsuranceFormData = z.infer<typeof updateInsuranceSchema>;