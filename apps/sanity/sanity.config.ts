import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "@acme/schemas";

export default defineConfig({
	name: "default",
	title: "react-native-sanity-turborepo",

	projectId: "jmeev7gk",
	dataset: "production",

	plugins: [deskTool(), visionTool()],

	schema: {
		types: schemaTypes,
	},
});
