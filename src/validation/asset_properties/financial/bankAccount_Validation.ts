import { z } from "zod";
import { maxMoneyValue } from "@/src/constants/asset_properties/maxMoneyValue";
import currencyCodes from "currency-codes";

const currencySchema = z.string("Invalid Currency").max(3, "Currency cannot exceed 3 characters.").refine((value) => currencyCodes.code(value) !== undefined, "Invalid Currency");

const interestRateSchema = z.number().min(0, "Interest rate cannot be negative.").max(999.99, "Interest rate exceeds limit.");
const balanceSchema = z.number().min(0, "Balance cannot be negative.").max(maxMoneyValue, "Balance exceeds limit.");

export const createBankAccountSchema = z.object({
    bank: z.string("Bank is required!").min(1, "Bank is required!").max(255, "Bank name exceeds limit."),
    bankAccountNumber: z.string("Bank account number is required!").min(1, "Bank account number is required!").max(40, "Bank account number exceeds limit."),
    interestRate: interestRateSchema.nullable().optional(),
    currency: currencySchema,
    currentBalance: balanceSchema,
});

export type CreateBankAccountFormData = z.infer<typeof createBankAccountSchema>;

export const updateBankAccountSchema = z.object({
    bank: z.string().max(255, "Bank name exceeds limit.").optional(),
    bankAccountNumber: z.string().max(40, "Bank account number exceeds limit.").optional(),
    interestRate: interestRateSchema.nullable().optional(),
    currency: currencySchema.optional(),
    currentBalance: balanceSchema.nullable().optional(),
});

export type UpdateBankAccountFormData = z.infer<typeof updateBankAccountSchema>;