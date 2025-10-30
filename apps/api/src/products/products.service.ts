import { PaginatedProducts } from './dto/product';
import { ProductsRepository } from './products.repository';
import type { FullProduct, NewProduct } from './dto/product';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductsService {
	constructor(private readonly productsRepository: ProductsRepository) { }
	async findById(id: string): Promise<FullProduct | undefined> {
		return this.productsRepository.findById(id);
	}
	async getProducts(page: number = 1, limit: number = 10, sortField: string, sortOrder: 'asc' | 'desc', search?: string): Promise<PaginatedProducts> {
		const offset = (page - 1) * limit;
		const whereClause = this.productsRepository.buildWhereClause(search);
		const sortClause = this.productsRepository.buildSortClause(sortField, sortOrder);
		const [items, total] = await Promise.all([
			this.productsRepository.findAll(whereClause, sortClause, limit, offset),
			this.productsRepository.count(whereClause)
		]);
		const totalPages = Math.ceil(total / limit);
		return { items, total, totalPages, currentPage: page };
	}
	async add(product: NewProduct): Promise<FullProduct> {
		return this.productsRepository.create(product);
	}
	async update({ id, ...updateData }: FullProduct): Promise<FullProduct> {
		const updatedProduct = await this.productsRepository.update(id, updateData);
		if (!updatedProduct) {
			throw new NotFoundException(`Продукт с id ${id} не найден`);
		}
		return updatedProduct;
	}
	async delete(productId: string): Promise<void> {
		const deleted = await this.productsRepository.delete(productId);
		if (!deleted) {
			throw new NotFoundException(`Продукт с id ${productId} не найден`);
		}
	}
}