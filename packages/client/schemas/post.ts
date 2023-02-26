import { z } from "zod";

export const postSchema = z.object({
	_id: z.string(),
	title: z.string(),
	content: z.string(),
	_createdAt: z.string(),
	_updatedAt: z.string(),
});

export const postsSchema = z.array(postSchema);
