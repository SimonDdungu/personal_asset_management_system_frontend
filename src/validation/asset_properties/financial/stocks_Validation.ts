import { z } from "zod";

export const createStocksSchema = z.object({
    tickerSymbol: z.string("Ticker symbol is required!").min(1, "Ticker symbol is required!").max(255, "Ticker symbol exceeds limit."),
    numberShares: z.number("Number of shares is required!").int().min(0, "Number of shares cannot be less than 0."),
    brokerage: z.string("Brokerage is required!").min(1, "Brokerage is required!").max(255, "Brokerage exceeds limit."),
});

export type CreateStocksFormData = z.infer<typeof createStocksSchema>;

export const updateStocksSchema = z.object({
    tickerSymbol: z.string().max(255, "Ticker symbol exceeds limit.").optional(),
    numberShares: z.number().int().min(0, "Number of shares cannot be less than 0.").optional(),
    brokerage: z.string().max(255, "Brokerage exceeds limit.").optional(),
});

export type UpdateStocksFormData = z.infer<typeof updateStocksSchema>;