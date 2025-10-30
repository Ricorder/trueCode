import s from './SortHeader.module.scss';
import { SortHeaderProps } from './SortHeader.props';

export const SortHeader = ({ setSort, sortOrder, sortField, field, title }: SortHeaderProps) => {
	const ArrowUp = () => (
		<svg className={s.arrowIcon} viewBox="0 0 24 24" fill="currentColor">
			<path d="M7 14l5-5 5 5z" />
		</svg>
	);
	const ArrowDown = () => (
		<svg className={s.arrowIcon} viewBox="0 0 24 24" fill="currentColor">
			<path d="M7 10l5 5 5-5z" />
		</svg>
	);
	const isActive = (field: string) => sortField === field;
	return (
		<div className={s.sortHeader}>
			{title}
			<div className={s.sortButtons}>
				<button
					onClick={() => setSort(`${field}`, 'asc')}
					className={isActive(`${field}`) && sortOrder === 'asc' ? s.active : ''}
					aria-label="Сортировать по возрастанию"
				>
					<ArrowUp />
				</button>
				<button
					onClick={() => setSort(`${field}`, 'desc')}
					className={isActive(`${field}`) && sortOrder === 'desc' ? s.active : ''}
					aria-label="Сортировать по убыванию"
				>
					<ArrowDown />
				</button>
			</div>
		</div>
	);
};
