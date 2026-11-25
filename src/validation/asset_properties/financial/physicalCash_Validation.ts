import { z } from "zod";
import { createAssetSchema } from "../asset_Validation";

export const createPhysicalCashSchema = z.object({
    asset: createAssetSchema,
});

export type CreatePhysicalCashFormData = z.infer<typeof createPhysicalCashSchema>;
