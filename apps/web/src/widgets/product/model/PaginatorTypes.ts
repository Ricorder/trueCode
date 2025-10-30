export interface PaginatorTypes {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	maxVisible?: number;
}