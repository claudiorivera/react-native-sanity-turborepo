import { z } from "zod";

import { client } from "../sanity";

// SCHEMAS
const postSchema = z.object({
	_id: z.string(),
	title: z.string(),
	content: z.string(),
	_createdAt: z.string(),
	_updatedAt: z.string(),
});

const postsSchema = z.array(postSchema);

export const createPostSchema = z.object({
	title: z.string().min(1),
	content: z.string().min(1),
});

// METHODS
export const fetchAllPosts = async () =>
	postsSchema.parse(await client.fetch(`*[_type == "post"]`));

export const fetchPostById = async (id: string) =>
	postSchema.parse(
		await client.fetch(`*[_type == "post" && _id == $id][0]`, { id }),
	);

export const createPost = (createpostDto: CreatePostDto) =>
	client.create({
		_type: "post",
		...createpostDto,
	});

export const deletePost = (id: string) => client.delete(id);

// TYPES
export type CreatePostDto = z.infer<typeof createPostSchema>;
