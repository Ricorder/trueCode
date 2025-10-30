import { z } from 'zod';

export const newProduct = z.object({
	name: z.string().min(1, 'Название обязательно'),
	description: z.string().min(1, 'Описание обязательно'),
	price: z.number().min(0, 'Цена не может быть отрицательной'),
	priceDiscount: z.number().min(0, 'Скидка не может быть отрицательной'),
	articleNumber: z.string().min(1, 'Артикул обязателен'),
	underPhoto: z.string().min(1, 'Изображение обязательно'),
});

export const fullProduct = newProduct.extend({
	id: z.string().min(1, 'ID обязателен'),
});
