'use client';
import Link from 'next/link';
import { Button } from '@/src/shared/ui/Button/Button';

export const ProductCreateButton = () => {
	return (
		<Link href = "/addProduct">
			<Button variant="primary" size="medium">
				Создать новый продукт
			</Button>
		</Link>
	);
};