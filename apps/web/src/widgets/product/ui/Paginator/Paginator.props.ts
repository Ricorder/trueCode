import { Dispatch, SetStateAction } from 'react';

export interface PaginatorProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (newPage: number) => void;
	maxVisible?: number;
}