import { SortField, SortOrder } from '@/src/shared';

export interface HeaderListProps {
	setSort: (field: SortField, order: SortOrder) => void;
	sortField: SortField;
	sortOrder: SortOrder;
}