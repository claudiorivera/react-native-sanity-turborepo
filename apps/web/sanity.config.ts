import { googleMapsInput } from "@sanity/google-maps-input";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

import { env } from "~/env.mjs";
import { event, post } from "~/schemas";

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = env.NEXT_PUBLIC_SANITY_DATASET;
const googleMapsApiKey = env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const config = defineConfig({
	basePath: "/studio", // <-- important that `basePath` matches the route you're mounting your studio from, it applies to both `/pages` and `/app`
	projectId,
	dataset,
	plugins: [
		deskTool(),
		visionTool(),
		googleMapsInput({
			apiKey: googleMapsApiKey,
		}),
	],
	schema: {
		types: [post, event],
	},
});

export default config;
