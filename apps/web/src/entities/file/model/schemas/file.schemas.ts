import { z } from 'zod';

export const inputFile = z.object({
	base64: z.string(),
	name: z.string(),
});

export const inputFiles = z.array(inputFile);

export const outputFile = z.string();
export const outputFiles = z.array(outputFile);