import { eventsSchema } from "../sanity/schemas";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const eventRouter = createTRPCRouter({
	all: publicProcedure.query(async ({ ctx }) => {
		return await ctx.client
			.fetch(`*[_type == "event"]`)
			.then((response) => eventsSchema.parse(response));
	}),
});
