import { z } from "zod";

export const postSchema = z.object({
	_id: z.string(),
	title: z.string(),
	content: z.string(),
	_createdAt: z.string(),
	_updatedAt: z.string(),
});

export const postsSchema = z.array(postSchema);

export const createPostSchema = z.object({
	title: z.string().min(1),
	content: z.string().min(1),
});
