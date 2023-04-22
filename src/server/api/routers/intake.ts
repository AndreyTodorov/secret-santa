import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import {
  deleteIntakeSchema,
  editIntakeSchema,
  intakeSchema,
  paginationSchema,
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
  getIntakes: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.intakeEntry.findMany({
        where: { ownerId: ctx.session?.user?.id, deletedAt: null },
        select: defaultIntakeSelect,
        orderBy: { intakeAt: "desc" },
      });
    } catch (error) {}
  }),
  getPaginatedIntakes: protectedProcedure
    .input(paginationSchema)
    .query(async ({ input, ctx }) => {
      const limit = input.limit ?? 20;
      const { cursor } = input;

      // TODO: should there be a query for days, and not intakes only
      // ! the limit should be on the days returned
      // should get intakes between 2 dates, next page will get the next 7 days e.g

      const intakes = await ctx.prisma.intakeEntry.findMany({
        take: limit + 1, // get an extra item at the end which we'll use as next cursor
        where: {
          ownerId: ctx.session?.user?.id,
          deletedAt: null,
          // intakeAt: {
          //   lte: new Date("2023-04-16").toISOString(),
          //   gte: new Date("2023-04-10").toISOString(),
          // },
        },
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          intakeAt: "desc",
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (intakes.length > limit) {
        const nextItem = intakes.pop();
        nextCursor = nextItem?.id;
      }
      return {
        intakes,
        nextCursor,
      };
    }),
});
