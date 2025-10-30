'use client';
import { ProductForm } from '@/src/features';
import { useProductForm } from '@/src/features';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { trpcClient } from '@/src/shared';
import s from './ChangeProduct.module.scss';
import { ThemeToggle } from '@/src/shared';

export function ChangeProduct({ id }: { id: string }) {
	const { data } = trpcClient.products.getProductById.useQuery({ id });
	const [previewUrl, setPreviewUrl] = useState('/square.jpg');
	useEffect(() => {
		if (data?.underPhoto) {
			setPreviewUrl(data.underPhoto);
		}
	}, [data?.underPhoto]);
	const form = useProductForm({
		mode: 'edit',
		initialData: data ?? null,
		previewUrl,
		setPreviewUrl,
	});
	return (
		<article className={s.block}>
			<div className={s.header}>
				<Link href="/products">
					Список продуктов
				</Link>
				<ThemeToggle />
			</div>
			<ProductForm
				{...form}
				mode="edit"
				initialUnderPhoto={data?.underPhoto}
			/>
		</article>
	);
}