'use client';
import { useEffect } from 'react';

export default function AddProductError({ error, reset }: { error: Error; reset: () => void }) {
	useEffect(() => {
		console.error(error);
	}, [error]);
	return (
		<div>
			<h2>Произошла ошибка при загрузке страницы добавления продукта</h2>
			<button onClick={() => reset()}>Попробовать снова</button>
		</div>
	);
}