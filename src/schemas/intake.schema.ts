import { Amount, RequestSource } from "@prisma/client";
import z from "zod";

export const createIntakeSchema = z.object({
  intakeAt: z.string().datetime({ offset: true }),
  description: z.string().optional(),
  requestSource: z.nativeEnum(RequestSource),
  amount: z.nativeEnum(Amount),
  ownerId: z.string().cuid(),
});

export type CreateIntakeInputType = z.TypeOf<typeof createIntakeSchema>;
