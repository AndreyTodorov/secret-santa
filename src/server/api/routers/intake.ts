import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import {
  deleteIntakeSchema,
  editIntakeSchema,
  intakeSchema,
} from "@/schemas/intake.schema";
import { Prisma } from "@prisma/client";

const defaultIntakeSelect = Prisma.validator<Prisma.IntakeEntrySelect>()({
  id: true,
  intakeAt: true,
  amount: true,
  description: true,
  requestSource: true,
  ownerId: true,
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
  deleteIntake: protectedProcedure
    .input(deleteIntakeSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.prisma.intakeEntry.delete({
          where: { id: input.id },
        });
      } catch (error) {}
    }),
  upsertIntake: protectedProcedure
    .input(editIntakeSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.prisma.intakeEntry.upsert({
          where: {
            id: input.id ?? "tempIntakeId",
          },
          update: input,
          create: {
            intakeAt: input.intakeAt,
            amount: input.amount,
            description: input.description,
            requestSource: input.requestSource,
            owner: { connect: { id: ctx.session.user.id } },
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
