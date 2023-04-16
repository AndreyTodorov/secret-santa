import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { createIntakeSchema } from "@/schemas/intake.schema";

export const intakeRouter = createTRPCRouter({
  createIntake: publicProcedure
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
});
