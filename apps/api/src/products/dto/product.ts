import { z } from 'zod';

export const idDtoInput = z
	.object({
		id: z.string(),
	})
	.required();

export const newProductDtoInput = z.object({
	name: z.string().min(1, 'Название обязательно'),
	description: z.string().min(1, 'Описание обязательно'),
	price: z.number().min(0, 'Цена не может быть отрицательной'),
	priceDiscount: z.number().min(0, 'Скидка не может быть отрицательной'),
	articleNumber: z.string().min(1, 'Артикул обязателен'),
	underPhoto: z.string().min(1, 'Изображение обязательно'),
});

export const productDtoOutput = newProductDtoInput.extend({
	id: z.string(),
});
export const paginatedProductsDtoOutput = z.object({
	items: z.array(productDtoOutput),
	total: z.number().int().nonnegative(),
	page: z.number().int().min(1),
	limit: z.number().int().min(1).max(100),
	totalPages: z.number().int().min(0),
	currentPage: z.number().int()
});
export const deleteProductInput = z.object({
	id: z.string(),
	underPhoto: z.string(),
});
export const deleteUnderPhoto = z.object({
	underPhoto: z.string(),
});

export const deleteProductOutput = z.string();
export const allProductsDtoOutput = z.array(productDtoOutput);
export const inputFile = z.object({
	base64: z.string(),
	name: z.string(),
});
export const inputFiles = z.array(
	z.object({
		base64: z.string(),
		name: z.string(),
	}),
);

export const SortRuleSchema = z.object({
	field: z.enum(['name', 'price', 'priceDiscount', 'articleNumber']),
	order: z.enum(['asc', 'desc']).default('asc'),
});

export const GetProductsSchema = z.object({
	page: z.number().default(1),
	limit: z.number().default(10),
	sortField: z.enum(['name', 'price', 'priceDiscount', 'articleNumber']).default('name'),
	sortOrder: z.enum(['asc', 'desc']).default('asc'),
	search: z.string().optional(),
});


export const outputFile = z.string();
export const outputFiles = z.array(z.string());

export type SortRule = z.infer<typeof SortRuleSchema>;
export type GetProductsInput = z.infer<typeof GetProductsSchema>;
export type File = z.infer<typeof inputFile>;
export type Files = z.infer<typeof inputFiles>;
export type NewProduct = z.infer<typeof newProductDtoInput>;
export type FullProduct = z.infer<typeof productDtoOutput>;
export type AllProductsDtoOutput = z.infer<typeof allProductsDtoOutput>;
export type PaginatedProductsDtoOutput = z.infer<typeof paginatedProductsDtoOutput>;
export type DeleteProductInput = z.infer<typeof deleteProductInput>;
export type DeleteProductOutput = z.infer<typeof deleteProductOutput>;
export type DeleteUnderPhotoInput = z.infer<typeof deleteUnderPhoto>;
export type PaginatedProducts = Promise<{
	items: FullProduct[];
	total: number;
	totalPages: number;
	currentPage: number;
}>