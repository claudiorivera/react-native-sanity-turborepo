import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

const eventSchema = z.object({
	_id: z.string(),
	_createdAt: z.string(),
	_updatedAt: z.string(),
	title: z.string(),
	location: z.object({
		lat: z.number(),
		lng: z.number(),
		alt: z.number().optional(),
	}),
	dateTime: z.string(),
	description: z.string(),
	image: z.object({
		asset: z.object({
			_ref: z.string(),
		}),
	}),
});

const eventsSchema = z.array(eventSchema);

export const eventRouter = createTRPCRouter({
	all: publicProcedure.query(async ({ ctx }) => {
		return await ctx.client
			.fetch(`*[_type == "event"]`)
			.then((response) => eventsSchema.parse(response));
	}),
});
