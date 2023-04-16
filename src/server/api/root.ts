import { createTRPCRouter } from "@/server/api/trpc";
import { partyRouter } from "@/server/api/routers/party";
import { intakeRouter } from "./routers/intake";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  party: partyRouter,
  intake: intakeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
