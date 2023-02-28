import { createClient } from "@sanity/client";

export const client = createClient({
	projectId: "jmeev7gk",
	dataset: "production",
	useCdn: false,
	apiVersion: "2023-02-23",
	token: process.env.SANITY_TOKEN,
});
