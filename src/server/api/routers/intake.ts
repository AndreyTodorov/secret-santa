import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { editIntakeSchema, intakeSchema } from "@/schemas/intake.schema";
import { Prisma } from "@prisma/client";

const defaultIntakeSelect = Prisma.validator<Prisma.IntakeEntrySelect>()({
  id: true,
  intakeAt: true,
  amount: true,
  description: true,
  requestSource: true,
});

export const intakeRouter = createTRPCRouter({
  createIntakePublic: publicProcedure
    .input(intakeSchema)
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
  createIntake: protectedProcedure
    .input(intakeSchema)
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
  editIntake: protectedProcedure
    .input(editIntakeSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.prisma.intakeEntry.update({
          where: {
            id: input.id,
          },
          data: {
            ...input,
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
