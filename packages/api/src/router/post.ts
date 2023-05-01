import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

const postSchema = z.object({
	_id: z.string(),
	title: z.string(),
	content: z.string(),
	_createdAt: z.string(),
	_updatedAt: z.string(),
});

const postsSchema = z.array(postSchema);

const createPostSchema = z.object({
	title: z.string().min(1),
	content: z.string().min(1),
});

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
