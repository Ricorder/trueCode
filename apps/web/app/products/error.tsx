'use client';
import { useEffect } from 'react';

export default function ProductsError({ error, reset }: { error: Error; reset: () => void }) {
	useEffect(() => {
		console.error(error);
	}, [error]);
	return (
		<div>
			<h2>Произошла ошибка при загрузке продуктов</h2>
			<button onClick={() => reset()}>Попробовать снова</button>
		</div>
	);
}