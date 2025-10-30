'use client';
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from './@generated/server';

export const trpcClient = createTRPCReact<AppRouter>({});
