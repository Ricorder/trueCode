import type { FullProduct } from '@/src/entities';

export const getProductEditUrl = (product: FullProduct): string => {
	return `/product/${product.id}`;
};
