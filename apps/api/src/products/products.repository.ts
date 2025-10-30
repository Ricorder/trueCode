import * as schema from '../configs/db/schema';
import { Inject, Injectable } from '@nestjs/common';
import type { DrizzleDB } from '../configs/db/drizzle';
import type { FullProduct, NewProduct } from './dto/product';
import { asc, count, desc, eq, ilike, or, SQL } from 'drizzle-orm';
import { DrizzleAsyncProvider } from '../configs/db/drizzle.provider';;

@Injectable()
export class ProductsRepository {
	constructor(@Inject(DrizzleAsyncProvider) private readonly db: DrizzleDB) { }
	async findById(id: string) {
		return this.db.query.products.findFirst({
			where: eq(schema.products.id, id),
		});
	}
	async findAll(where?: any, orderBy?: any, limit?: number, offset?: number) {
		return this.db
			.select()
			.from(schema.products)
			.where(where)
			.orderBy(...orderBy)
			.limit(limit)
			.offset(offset);
	}
	async create(product: NewProduct): Promise<FullProduct> {
		const [newProduct] = await this.db
			.insert(schema.products)
			.values(product)
			.returning();
		return newProduct;
	}
	async update(id: string, data: Partial<FullProduct>): Promise<FullProduct> {
		const [updated] = await this.db
			.update(schema.products)
			.set(data)
			.where(eq(schema.products.id, id))
			.returning();
		return updated;
	}
	async delete(id: string): Promise<boolean> {
		const result = await this.db
			.delete(schema.products)
			.where(eq(schema.products.id, id));
		return result.rowCount > 0;
	}
	async count(where?: any): Promise<number> {
		const result = await this.db
			.select({ count: count() })
			.from(schema.products)
			.where(where);
		return Number(result[0].count);
	}
	buildWhereClause(search?: string): SQL | undefined {
		if (!search?.trim()) return undefined;
		const searchTerm = `%${search.trim().toLowerCase()}%`;
		return or(
			ilike(schema.products.name, searchTerm),
			ilike(schema.products.description, searchTerm),
			ilike(schema.products.articleNumber, searchTerm)
		);
	}
	buildSortClause(sortField: string, sortOrder: 'asc' | 'desc') {
		const sortableFields = {
			name: schema.products.name,
			price: schema.products.price,
			priceDiscount: schema.products.priceDiscount,
			articleNumber: schema.products.articleNumber,
		};
		const column = sortableFields[sortField as keyof typeof sortableFields];
		if (!column) {
			return [asc(schema.products.name)];
		}
		return sortOrder === 'asc' ? [asc(column)] : [desc(column)];
	}
}