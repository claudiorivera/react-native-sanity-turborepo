import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "@acme/schemas";

import { env } from "~/env.mjs";

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = env.NEXT_PUBLIC_SANITY_DATASET;

const config = defineConfig({
	basePath: "/studio", // <-- important that `basePath` matches the route you're mounting your studio from, it applies to both `/pages` and `/app`
	projectId,
	dataset,
	plugins: [deskTool(), visionTool()],
	schema: {
		types: schemaTypes,
	},
});

export default config;
