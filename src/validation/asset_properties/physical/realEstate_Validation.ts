import { z } from "zod";
import { maxMoneyValue } from "@/src/constants/asset_properties/maxMoneyValue";
import { maxPropertySize } from "@/src/constants/asset_properties/maxPropertySize";
import { PROPERTY_SIZE_UNITS } from "@/src/constants/symbols/propertySizeUnitLabels";
import currencyCodes from "currency-codes";

export const createRealEstateSchema = z.object({
    address: z.string("Address is required!").min(2, "Address is required!").max(255, "Address of real estate exceeds limit."),
    numberBedrooms: z.number("Number of Bedrooms is required").int().min(0, "Number of Bedrooms is required"),
    numberBathrooms: z.number("Number of Bathrooms is required").int().min(0, "Number of Bathrooms is required"),
    numberUnits: z.number().int().min(0, "Number of Units cannot be less than 0.").nullable().optional(),
    propertySize: z.number().min(0, "Property size cannot be negative.").max(maxPropertySize, "Property size exceeds limit.").nullable().optional(),
    propertySizeUnit: z.enum(PROPERTY_SIZE_UNITS, {error: "Please select a property size unit."}).nullable().optional(),
    constructionCostCurrency: z.string().refine((value) => currencyCodes.code(value) !== undefined, "Invalid Currency").nullable().optional(),
    constructionCost: z.number().min(0, "Construction cost cannot be negative.").max(maxMoneyValue, "Construction cost exceeds limit.").nullable().optional(),
    constructionCompletionDate: z.string().nullable().optional(),
    rentalIncomeCurrency: z.string().refine((value) => currencyCodes.code(value) !== undefined, "Invalid Currency").nullable().optional(),
    rentalIncome: z.number().min(0, "Rental income cannot be negative.").max(maxMoneyValue, "Rental income exceeds limit.").nullable().optional(),
});

export type CreateRealEstateFormData = z.infer<typeof createRealEstateSchema>;


export const updateRealEstateSchema = z.object({
    address: z.string().max(255, "Address of real estate exceeds limit.").optional(),
    numberBedrooms: z.number().int().min(0, "Number of Bedrooms cannot be less than 0.").nullable().optional(),
    numberBathrooms: z.number().int().min(0, "Number of Bathrooms cannot be less than 0.").nullable().optional(),
    numberUnits: z.number().int().min(0, "Number of Units cannot be less than 0.").nullable().optional(),
    propertySize: z.number().min(0, "Property size cannot be negative.").max(maxPropertySize, "Property size exceeds limit.").nullable().optional(),
    propertySizeUnit: z.enum(PROPERTY_SIZE_UNITS).optional(),
    constructionCostCurrency: z.string().refine((value) => currencyCodes.code(value) !== undefined, "Invalid Currency").optional(),
    constructionCost: z.number().min(0, "Construction cost cannot be negative.").max(maxMoneyValue, "Construction cost exceeds limit.").nullable().optional(),
    constructionCompletionDate: z.string().optional(),
    rentalIncomeCurrency: z.string().refine((value) => currencyCodes.code(value) !== undefined, "Invalid Currency").optional(),
    rentalIncome: z.number().min(0, "Rental income cannot be negative.").max(maxMoneyValue, "Rental income exceeds limit.").nullable().optional(),
});

export type UpdateRealEstateFormData = z.infer<typeof updateRealEstateSchema>;

