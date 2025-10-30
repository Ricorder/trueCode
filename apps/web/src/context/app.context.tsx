'use client';
import { trpcClient } from '@/src/shared/config/trpc/client';
import { useRouter } from 'next/navigation';
import { Dispatch, type PropsWithChildren, SetStateAction, createContext, useContext, useState } from 'react';
import { AddProductType, ChangeProductType, DeleteProductType, FileType, GetProductType, GetProductTypes } from '@/src/shared/types/types';

export interface IAppContext {
	deleteProduct: DeleteProductType;
	add: AddProductType;
	getProduct: GetProductType;
	getProducts: GetProductTypes;
	setCurrentPage: Dispatch<SetStateAction<number>>;
	currentPage: number;
	change: ChangeProductType;
	file: FileType;
}

const AppContext = createContext<IAppContext>({
	deleteProduct: (() => {
		throw new Error('Function not implemented.');
	}) as unknown as DeleteProductType,
	add: (() => {
		throw new Error('Function not implemented.');
	}) as unknown as AddProductType,
	getProduct: (() => {
		throw new Error('Function not implemented.');
	}) as unknown as GetProductType,
	getProducts: (() => {
		throw new Error('Function not implemented.');
	}) as unknown as GetProductTypes,
	setCurrentPage: function (_value: SetStateAction<number>): void {
		throw new Error('Function not implemented.');
	},
	currentPage: 0,
	change: (() => {
		throw new Error('Function not implemented.');
	}) as unknown as ChangeProductType,
	file: (() => {
		throw new Error('Function not implemented.');
	}) as unknown as FileType,
});

export const AppContextProvider = ({ children }: PropsWithChildren) => {
	const router = useRouter();
	const utils = trpcClient.useUtils();
	const [currentPage, setCurrentPage] = useState(1);
	const limit = 10;
	const getProducts = trpcClient.products.getAllProducts.useQuery({
		page: currentPage,
		limit,
	});
	const getProduct = trpcClient.products.getProductById.useQuery({ id: '1' });
	const add = trpcClient.products.addProduct.useMutation({
		onSuccess: () => {
			utils.products.getAllProducts.invalidate();
			router.push('/products');
		},
		onError: (error) => {
			console.error('Ошибка при создании продукта:', error);
		}
	});
	const change = trpcClient.products.changeProduct.useMutation({
		onSuccess: () => {
			utils.products.getAllProducts.invalidate();
			router.push('/products');
		},
		onError: (error) => {
			console.error('Ошибка при изменении продукта:', error);
		}
	});
	const deleteProduct = trpcClient.products.deleteProduct.useMutation({
		onSettled: () => {
			getProducts.refetch();
		},
	});
	const file = trpcClient.products.addFile.useMutation();
	return (
		<AppContext.Provider
			value={{
				add,
				getProduct,
				getProducts,
				setCurrentPage,
				deleteProduct,
				currentPage,
				change,
				file,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
export const useAppContext = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error('useAppContext must be used within an AppContextProvider');
	}
	return context;
};
