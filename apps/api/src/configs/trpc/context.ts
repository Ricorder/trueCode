import { Injectable } from '@nestjs/common';
import type { ContextOptions, TRPCContext } from 'nestjs-trpc';

@Injectable()
export class AppContext implements TRPCContext {
	async create({ req, res }: ContextOptions): Promise<Record<string, unknown>> {
		const user = { name: req.headers.name ?? 'anonymous' };
		return {
			isContextApplied: true,
			req,
			res,
			user,
		};
	}
}
