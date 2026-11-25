import { z } from "zod";
import { maxMoneyValue } from "@/src/constants/asset_properties/maxMoneyValue";
import { createAssetSchema } from "../asset_Validation";

const originalAmountSchema = z.number("Original amount is required!")
    .min(0, "Original amount cannot be negative.")
    .max(maxMoneyValue, "Original amount exceeds limit.");
const interestRateSchema = z.number().min(0, "Interest rate cannot be negative.").max(999.99, "Interest rate exceeds limit.");

export const createLoansSchema = z.object({
    asset: createAssetSchema,
    lender: z.string("Lender is required!").min(1, "Lender is required!").max(255, "Lender exceeds limit."),
    originalAmount: originalAmountSchema,
    interestRate: interestRateSchema.optional(),
    startDate: z.string("Start date is required!").min(1, "Start date is required!"),
    maturityDate: z.string().optional(),
});

export type CreateLoansFormData = z.infer<typeof createLoansSchema>;

export const updateLoansSchema = z.object({
    lender: z.string().max(255, "Lender exceeds limit.").optional(),
    originalAmount: originalAmountSchema.optional(),
    interestRate: interestRateSchema.optional(),
    startDate: z.string().optional(),
    maturityDate: z.string().optional(),
});

export type UpdateLoansFormData = z.infer<typeof updateLoansSchema>;