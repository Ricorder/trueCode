'use client';
import { useEffect } from 'react';

export default function ProductError({ error, reset }: { error: Error; reset: () => void }) {
	useEffect(() => {
		console.error(error);
	}, [error]);
	return (
		<div>
			<h2>Произошла ошибка при загрузке продукта</h2>
			<button onClick={() => reset()}>Попробовать снова</button>
		</div>
	);
}