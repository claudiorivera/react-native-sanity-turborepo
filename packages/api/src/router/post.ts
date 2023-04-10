import { z } from "zod";

import { createPostSchema, postSchema, postsSchema } from "../sanity";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
	all: publicProcedure.query(async ({ ctx }) => {
		return await ctx.client
			.fetch(`*[_type == "post"]`)
			.then((response) => postsSchema.parse(response));
	}),
	byId: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
		return await ctx.client
			.fetch(`*[_type == "post" && _id == $id][0]`, { id: input })
			.then((response) => postSchema.parse(response));
	}),
	create: publicProcedure.input(createPostSchema).mutation(({ ctx, input }) => {
		return ctx.client.create({
			_type: "post",
			...input,
		});
	}),
	delete: publicProcedure.input(z.string()).mutation(({ ctx, input }) => {
		return ctx.client.delete(input);
	}),
});
