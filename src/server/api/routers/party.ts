import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { createPartySchema } from "@/schemas/party.schema";
import { Prisma } from "@prisma/client";

// const findSpecificParty = (id: string) => {
//   return Prisma.validator<Prisma.PartyWhereInput>()({
//     id,
//   });
// };

const defaultPartySelect = Prisma.validator<Prisma.PartySelect>()({
  id: true,
  date: true,
  notificationAt: true,
  description: true,
  budget: true,
  status: true,
});

// const defaultPartySelect = Pr.validator<Prisma.Pa>()({

export const partyRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.party.findMany({
        where: { creatorId: ctx.session.user.id },
        select: defaultPartySelect,
        orderBy: { id: "desc" },
      });
    } catch (error) {
      console.log("error getting parties?", error);
    }
  }),
  getById: protectedProcedure
    .input(
      z.object({
        partyId: z.string().cuid(),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        return await ctx.prisma.party.findFirst({
          where: { creatorId: ctx.session.user.id, id: input.partyId },
          select: defaultPartySelect,
        });
      } catch (error) {
        console.log("error getting party by ID?", error);
      }
    }),
  create: protectedProcedure
    .input(createPartySchema)
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.prisma.party.create({
          data: {
            ...input,
            creator: { connect: { id: ctx.session.user.id } },
          },
        });
      } catch (error) {}
    }),
});
