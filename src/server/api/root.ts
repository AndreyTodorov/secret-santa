import { createTRPCRouter } from "@/server/api/trpc";
import { partyRouter } from "@/server/api/routers/party";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  party: partyRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
