import { z } from "zod";
import { postSchema, postsSchema } from "@acme/client";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
	all: publicProcedure.query(async ({ ctx }) => {
		return postsSchema.parse(await ctx.client.fetch(`*[_type == "post"]`));
	}),
	byId: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
		return postSchema.parse(
			await ctx.client.fetch(`*[_type == "post" && _id == $id][0]`, {
				id: input,
			}),
		);
	}),
	create: publicProcedure
		.input(z.object({ title: z.string().min(1), content: z.string().min(1) }))
		.mutation(({ ctx, input }) => {
			return ctx.client.create({
				_type: "post",
				...input,
			});
		}),
	delete: publicProcedure.input(z.string()).mutation(({ ctx, input }) => {
		return ctx.client.delete(input);
	}),
});
