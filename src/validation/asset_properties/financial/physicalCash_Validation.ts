import { z } from "zod";

export const createPhysicalCashSchema = z.object({
});

export type CreatePhysicalCashFormData = z.infer<typeof createPhysicalCashSchema>;
