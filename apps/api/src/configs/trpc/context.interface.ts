import type { FastifyReply, FastifyRequest } from 'fastify';

export interface IAppContext {
	isContextApplied: boolean;
	req: FastifyRequest;
	res: FastifyReply;
	user: {
		name: string | string[];
	};
}
