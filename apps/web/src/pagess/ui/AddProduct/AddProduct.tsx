'use client';
import Link from 'next/link';
import { ProductForm } from '@/src/features';
import { useProductForm } from '@/src/features';
import { useState } from 'react';
import s from './AddProduct.module.scss';
import { ThemeToggle } from '@/src/shared';

export function AddProduct() {
	const [previewUrl, setPreviewUrl] = useState('/square.jpg');
	const form = useProductForm({
		mode: 'create',
		previewUrl,
		setPreviewUrl
	});
	return (
		<div className={s.block}>
			<div className={s.header}>
				<Link href="/products">
					Список продуктов
				</Link>
				<ThemeToggle />
			</div>
			<ProductForm {...form} mode="create" />
		</div>
	);
}
