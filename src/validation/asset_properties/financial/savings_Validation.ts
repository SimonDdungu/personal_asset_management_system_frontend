import { z } from "zod";

const interestRateSchema = z.number().min(0, "Interest rate cannot be negative.").max(999.99, "Interest rate exceeds limit.");

export const createSavingsSchema = z.object({
    institution: z.string("Institution is required!").min(1, "Institution is required!").max(255, "Institution exceeds limit."),
    accountNumber: z.string("Account number is required!").min(1, "Account number is required!").max(255, "Account number exceeds limit."),
    interestRate: interestRateSchema.nullable().optional(),
    maturityDate: z.string().optional(),
});

export type CreateSavingsFormData = z.infer<typeof createSavingsSchema>;

export const updateSavingsSchema = z.object({
    institution: z.string().max(255, "Institution exceeds limit.").optional(),
    accountNumber: z.string().max(255, "Account number exceeds limit.").optional(),
    interestRate: interestRateSchema.nullable().optional(),
    maturityDate: z.string().optional(),
});

export type UpdateSavingsFormData = z.infer<typeof updateSavingsSchema>;