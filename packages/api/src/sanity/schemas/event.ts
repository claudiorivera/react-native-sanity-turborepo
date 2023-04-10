import { z } from "zod";

export const eventSchema = z.object({
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

export const eventsSchema = z.array(eventSchema);
