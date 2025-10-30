'use client';
import { useCallback, useEffect, useRef } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { Paginator } from '../Paginator/Paginator';
import s from './ProductList.module.scss';
import { HeaderList } from '../HeaderList/HeaderList';
import { ProductSearch } from '../ProductSearch/ProductSearch';
import { useQueryParams, SortField, SortOrder } from '@/src/shared';
import { trpcClient } from '@/src/shared';

export const ProductList = () => {
	const productListRef = useRef<HTMLDivElement>(null);
	const { updateQuery, getParam } = useQueryParams();
	const page = Number(getParam('page', '1'));
	const sortField = getParam<SortField>('sort', 'name');
	const sortOrder = getParam<SortOrder>('order', 'asc');
	const searchQuery = getParam('search', '');
	const { data } = trpcClient.products.getAllProducts.useQuery({
		page,
		limit: 10,
		sortField,
		sortOrder,
		search: searchQuery || undefined,
	});
	useEffect(() => {
		if (productListRef.current) {
			window.scrollTo({
				top: productListRef.current.offsetTop,
				behavior: 'smooth'
			});
		}
	}, [page]);
	const handlePageChange = (newPage: number) => {
		updateQuery({ page: newPage });
	};
	const handleSort = (field: SortField, order: SortOrder) => {
		updateQuery({ sort: field, order, page: 1 });
	};
	const handleSearch = useCallback((query: string) => {
		updateQuery({ search: query || null, page: 1 });
	}, []);
	const handleClearSearch = () => {
		updateQuery({ search: null, page: 1 });
	};
	return (
		<div className={s.productList} ref={productListRef}>
			<ProductSearch
				value={searchQuery}
				onChange={handleSearch}
				onClear={handleClearSearch}
			/>
			<HeaderList
				sortField={sortField}
				sortOrder={sortOrder}
				setSort={handleSort}
			/>
			<div className={s.products}>
				{data?.items.length ? (
					data.items.map((product) => (
						<ProductCard key={product.id} product={product} />
					))
				) : (
					<div className={s.noResults}>
						{searchQuery
							? `По запросу "${searchQuery}" ничего не найдено`
							: 'Нет продуктов'}
					</div>
				)}
			</div>
			{data && data.totalPages > 1 && (
				<Paginator
					currentPage={page}
					totalPages={data.totalPages}
					onPageChange={handlePageChange}
				/>
			)}
		</div>
	);
};
