import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { createIntakeSchema } from "@/schemas/intake.schema";
import { Prisma } from "@prisma/client";

const defaultIntakeSelect = Prisma.validator<Prisma.IntakeEntrySelect>()({
  id: true,
  intakeAt: true,
  amount: true,
  description: true,
  requestSource: true,
});

export const intakeRouter = createTRPCRouter({
  createIntakeFromShortcut: publicProcedure
    .input(createIntakeSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.prisma.intakeEntry.create({
          data: {
            intakeAt: input.intakeAt,
            amount: input.amount,
            description: input.description,
            requestSource: input.requestSource,
            owner: { connect: { id: input.ownerId } },
          },
        });
      } catch (error) {}
    }),
  getWeeklyIntakes: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.intakeEntry.findMany({
        where: { ownerId: ctx.session?.user?.id, deletedAt: null },
        select: defaultIntakeSelect,
        orderBy: { intakeAt: "desc" },
      });
    } catch (error) {}
  }),
});
