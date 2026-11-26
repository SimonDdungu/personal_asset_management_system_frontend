import { z } from "zod";

const interestRateSchema = z.number().min(0, "Interest rate cannot be negative.").max(999.99, "Interest rate exceeds limit.");

export const createInvestmentSchema = z.object({
    quantity: z.number("Quantity is required!").int().min(0, "Quantity cannot be less than 0."),
    institution: z.string().max(255, "Institution exceeds limit.").optional(),
    interestRate: interestRateSchema.optional(),
    referenceNumber: z.string().max(255, "Reference number exceeds limit.").optional(),
});

export type CreateInvestmentFormData = z.infer<typeof createInvestmentSchema>;

export const updateInvestmentSchema = z.object({
    quantity: z.number().int().min(0, "Quantity cannot be less than 0.").optional(),
    institution: z.string().max(255, "Institution exceeds limit.").optional(),
    interestRate: interestRateSchema.optional(),
    referenceNumber: z.string().max(255, "Reference number exceeds limit.").optional(),
});

export type UpdateInvestmentFormData = z.infer<typeof updateInvestmentSchema>;