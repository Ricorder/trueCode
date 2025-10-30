import { ChangeProduct } from '@/src/pagess';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Страница изменения продукта',
	description: 'Здесь можно изменить название, артикул, описание и цену продукта',
};
export interface EditProductPageProps {
	params: Promise<{ id: string }>
}

export default async function ChangeProductPage({ params }: EditProductPageProps) {
	const { id } = await params;
	return <ChangeProduct id={id} />;
}
