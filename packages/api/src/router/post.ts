import { z } from "zod";
import { createPostSchema } from "@acme/client";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
	all: publicProcedure.query(({ ctx }) => {
		return ctx.client.fetchAllPosts();
	}),
	byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
		return ctx.client.fetchPostById(input);
	}),
	create: publicProcedure.input(createPostSchema).mutation(({ ctx, input }) => {
		return ctx.client.createPost(input);
	}),
	delete: publicProcedure.input(z.string()).mutation(({ ctx, input }) => {
		return ctx.client.deletePost(input);
	}),
});
