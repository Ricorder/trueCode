// Вспомогательная функция (можно вынести в shared/lib/utils)
export const getPaginationRange = (current: number, total: number, maxVisible = 5): number[] => {
	const half = Math.floor(maxVisible / 2);
	let start = Math.max(1, current - half);
	const end = Math.min(total, start + maxVisible - 1);
	if (end - start + 1 < maxVisible) {
		start = Math.max(1, end - maxVisible + 1);
	}
	return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};