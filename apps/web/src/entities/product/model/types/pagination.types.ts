import { z } from 'zod';
import { paginated, paginatedProducts } from '../schemas';
import { FullProduct } from './product.types';

export type PaginatedProductsDtoOutput = z.infer<typeof paginatedProducts>;
export type Paginated = z.infer<typeof paginated>;
export type PaginatedProducts = Promise<{
	items: FullProduct[];
	total: number;
	totalPages: number;
}>
