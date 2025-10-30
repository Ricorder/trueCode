import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
	title: 'Вход в систему',
	description: 'Начальная страница',
};

export default async function Main() {
	return (
		redirect('/products')
	);
}
