'use client';
import { type QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { type ReactNode, useState } from 'react';
// import { SuperJSON } from 'superjson';
import { trpcClient } from './client';
import { makeQueryClient } from './query-client';

let clientQueryClientSingleton: QueryClient;
function getQueryClient() {
	if (typeof window === 'undefined') {
		return makeQueryClient();
	}
	return (clientQueryClientSingleton ??= makeQueryClient());
}
function getUrl() {
	if (typeof window !== 'undefined') {
		return `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/trpc`;
	}
	return 'http://api:8000/trpc';
}
export function TRPCProvider({ children }: { children: ReactNode }) {
	const queryClient = getQueryClient();
	const [trpcClientInstance] = useState(() =>
		trpcClient.createClient({
			links: [
				httpBatchLink({
					url: getUrl(),
					// transformer: SuperJSON,
				}),
			],
		}),
	);
	return (
		<trpcClient.Provider client={trpcClientInstance} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				{children}
			</QueryClientProvider>
		</trpcClient.Provider>
	);
}
