import { z } from 'zod';
import { fullProduct, newProduct } from '../schemas';

export type NewProduct = z.infer<typeof newProduct>;
export type FullProduct = z.infer<typeof fullProduct>;