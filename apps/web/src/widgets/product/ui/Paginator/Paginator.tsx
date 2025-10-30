import { getPaginationRange } from '../../lib';
import s from './Paginator.module.scss';
import { PaginatorProps } from './Paginator.props';

export const Paginator = ({
	currentPage,
	totalPages,
	onPageChange,
	maxVisible = 5,
}: PaginatorProps) => {
	if (totalPages <= 1) return null;
	const pageNumbers = getPaginationRange(currentPage, totalPages, maxVisible);
	return (
		<div className={s.pagination}>
			<button
				type="button"
				onClick={(e) => {
					e.preventDefault(); // ← критически важно
					onPageChange(currentPage - 1);
				}}
				disabled={currentPage === 1}
				className={s.paginationButton}
			>
				&laquo; Назад
			</button>
			{pageNumbers.map((page) => (
				<button
					type="button"
					key={page}
					onClick={(e) => {
						e.preventDefault(); // ← критически важно
						onPageChange(page);
					}}
					className={`${s.paginationButton} ${page === currentPage ? s.paginationButtonActive : ''}`}
				>
					{page}
				</button>
			))}
			<button
				type="button"
				onClick={(e) => {
					e.preventDefault(); // ← критически важно
					onPageChange(currentPage + 1);
				}}
				disabled={currentPage === totalPages}
				className={s.paginationButton}
			>
				Вперёд &raquo;
			</button>
		</div>
	);
};