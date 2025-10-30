import { z } from 'zod';
import { inputFile, inputFiles } from '../schemas';

export type File = z.infer<typeof inputFile>;
export type Files = z.infer<typeof inputFiles>;