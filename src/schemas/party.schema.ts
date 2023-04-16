import z from "zod";

export const createPartySchema = z.object({
  date: z.date(),
  notificationAt: z.date(),
  description: z.string().optional(),
  budget: z.string().optional(),
});

export type AddPartyInputType = z.TypeOf<typeof createPartySchema>;
