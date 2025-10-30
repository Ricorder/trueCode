import { AddProduct } from '@/src/pagess';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Страница создания продукта',
	description: 'Здесь можно добавить новый продукт, указах его характеристики',
};

export default function AddProductPage() {
	return <AddProduct />;
}
