import { Products } from '@/src/pagess/ui/Products/Products';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Список всех продуктов',
	description: 'Здесь можно посмотреть все продукты',
};

export default function ProductsPage() {
	return <Products />;
}
