import { SortField, SortOrder } from '../../types';

export interface SortHeaderProps {
	setSort: (field: SortField, order: SortOrder) => void;
	sortField: SortField;
	field: SortField;
	sortOrder: SortOrder;
	title: string;
}