import { z } from 'zod';
import { fullProduct } from './product.schemas';

export const paginated = z.object({
	page: z.number().int().min(1).default(1),
	limit: z.number().int().min(1).max(100).default(10),
});

export const paginatedProducts = z.object({
	items: z.array(fullProduct),
	total: z.number().int().nonnegative(),
	page: z.number().int().min(1),
	limit: z.number().int().min(1).max(100),
	totalPages: z.number().int().min(0),
});

