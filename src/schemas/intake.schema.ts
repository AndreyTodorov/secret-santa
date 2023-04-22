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

export const paginationSchema = z.object({
  limit: z.number().min(1).max(100).nullish(),
  cursor: z.string().nullish(), // <-- "cursor" needs to exist, but can be any type
});

export type IntakeInputType = z.TypeOf<typeof intakeSchema>;
export type UpsertIntakeInputType = z.TypeOf<typeof editIntakeSchema>;
