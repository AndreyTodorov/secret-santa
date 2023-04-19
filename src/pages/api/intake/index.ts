import { type NextApiRequest, type NextApiResponse } from "next";
import { appRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import { createIntakeSchema } from "@/schemas/intake.schema";
import { ZodError } from "zod";

const createIntakeHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { method, headers } = req;

  switch (method) {
    case "POST":
      // Create context and caller
      const ctx = await createTRPCContext({ req, res });
      const caller = appRouter.createCaller(ctx);

      if (
        !headers.authorization ||
        !headers.authorization.split("Bearer ")[1]
      ) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const bearerToken = headers.authorization.split("Bearer ")[1];
      const user = await ctx.prisma.user.findUnique({
        where: {
          bearerToken,
        },
      });

      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      // Update or create data in your database
      try {
        const input = createIntakeSchema.parse({
          ...req.body,
          ownerId: user.id,
        });
        await caller.intake.createIntakeFromShortcut(input);
        res.status(200).json({ status: "ok" });
      } catch (cause) {
        if (cause instanceof TRPCError) {
          // An error from tRPC occured
          const httpCode = getHTTPStatusCodeFromError(cause);
          return res.status(httpCode).json(cause);
        } else if (cause instanceof ZodError) {
          return res.status(404).json(cause.issues[0]?.message);
        }
        // Another error occured
        console.error(cause);
        res.status(500).json({ message: "Internal server error" });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method ?? ""} Not Allowed`);
  }
};

export default createIntakeHandler;
