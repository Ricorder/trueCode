import { trpcClient } from '@/src/shared';

export const useDeleteProduct = (onSuccess?: () => void) => {
	const utils = trpcClient.useUtils();
	return trpcClient.products.deleteProduct.useMutation({
		onSuccess: () => {
			utils.products.getAllProducts.invalidate();
			onSuccess?.();
		},
	});
};
