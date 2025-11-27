import { ProductList } from '@/src/widgets';
import { ProductCreateButton } from '@/src/features';
import s from './Products.module.scss';
import { ThemeToggle } from '@/src/shared';

export const Products = () => {
	return (
		<main className={s.container}>
			<div className={s.header}>
				<h1 className={s.title}>Список продуктов</h1>
				<div className={s.header}>
					<ProductCreateButton />
					<ThemeToggle />
				</div>
			</div>
			<ProductList />
		</main>
	);
};
