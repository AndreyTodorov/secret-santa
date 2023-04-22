import { Amount, RequestSource } from "@prisma/client";
import z from "zod";

export const intakeSchema = z.object({
  intakeAt: z.string().datetime({ offset: true }),
  description: z.string().trim().nullable(),
  requestSource: z.nativeEnum(RequestSource),
  amount: z.nativeEnum(Amount),
  ownerId: z.string().cuid(),
});

// should be optional, because when we are creating we have no values
export const editIntakeSchema = intakeSchema.extend({
  id: z.string().cuid().optional(),
  ownerId: z.string().cuid().optional(),
});

export const deleteIntakeSchema = z.object({
  id: z.string().cuid(),
});

export type IntakeInputType = z.TypeOf<typeof intakeSchema>;
export type UpsertIntakeInputType = z.TypeOf<typeof editIntakeSchema>;
