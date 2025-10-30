import { useState, useEffect } from 'react';
import s from './ProductSearch.module.scss';

interface ProductSearchProps {
	value: string;
	onChange: (value: string) => void;
	onClear: () => void;
}

export const ProductSearch = ({ value, onChange, onClear }: ProductSearchProps) => {
	const [inputValue, setInputValue] = useState(value);
	// Синхронизация с внешним состоянием
	useEffect(() => {
		setInputValue(value);
	}, [value]);
	// Дебаунс поиска (300ms)
	useEffect(() => {
		const timeout = setTimeout(() => {
			onChange(inputValue);
		}, 300);
		return () => clearTimeout(timeout);
	}, [inputValue, onChange]);
	const handleClear = () => {
		setInputValue('');
		onClear();
	};
	return (
		<div className={s.searchContainer}>
			<input
				type="text"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				placeholder="Поиск по названию, описанию или артикулу..."
				className={s.searchInput}
			/>
			{inputValue && (
				<button
					onClick={handleClear}
					className={s.clearButton}
					aria-label="Очистить поиск"
				>
					✕
				</button>
			)}
		</div>
	);
};