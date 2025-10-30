import { createTRPCClient, httpBatchLink } from '@trpc/client';
// import { SuperJSON } from 'superjson';
import type { AppRouter } from './@generated/server';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const trpcServer = createTRPCClient<AppRouter>({
	links: [
		httpBatchLink({
			url: apiUrl || '',
			// transformer: SuperJSON,
		}),
	],
});
