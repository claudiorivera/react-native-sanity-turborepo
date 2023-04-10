import { eventRouter } from "./router/event";
import { postRouter } from "./router/post";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
	post: postRouter,
	event: eventRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
