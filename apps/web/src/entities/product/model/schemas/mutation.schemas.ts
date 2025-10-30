import { z } from 'zod';

export const deleteProductInput = z.object({
	id: z.string(),
	underPhoto: z.string(),
});

export const deleteUnderPhoto = z.object({
	underPhoto: z.string(),
});

export const inputTemporaryFiles = z.object({
	underPhoto: z.string(),
});

// Если нужно — можно добавить
export const idDtoInput = z.object({
	id: z.string(),
}).required();

export const deleteProduct = z.string(); // ← странно, но оставим как есть