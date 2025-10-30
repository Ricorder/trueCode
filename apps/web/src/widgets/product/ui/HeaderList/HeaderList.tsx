'use client';
import s from './HeaderList.module.scss';
import { SortHeader } from '@/src/shared';
import { HeaderListProps } from './HeaderList.props';

export const HeaderList = ({ sortField, sortOrder, setSort }: HeaderListProps) => {
	return (
		<div className={s.header}>
			<div>Фото</div>
			<SortHeader setSort={setSort} sortOrder={sortOrder} sortField={sortField} field={'name'} title={'Название'} />
			<div className={s.hideOnTablet}>Описание</div>
			<div className={s.hideOnMobile}>
				<SortHeader setSort={setSort} sortOrder={sortOrder} sortField={sortField} field={'price'} title={'Цена'} />
			</div>
			<SortHeader setSort={setSort} sortOrder={sortOrder} sortField={sortField} field={'priceDiscount'} title={'Цена со скидкой'} />
			<div className={s.hideOnTablet}>
				<SortHeader setSort={setSort} sortOrder={sortOrder} sortField={sortField} field={'articleNumber'} title={'Артикул'} />
			</div>
			<div>Удалить</div>
		</div>
	);
};
