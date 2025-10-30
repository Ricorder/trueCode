import { TRPCError } from '@trpc/server';
import { Input, Mutation, Query, Router } from 'nestjs-trpc';
import {
	type File,
	type NewProduct,
	type FullProduct,
	type DeleteProductInput,
	type DeleteProductOutput,
	type DeleteUnderPhotoInput,
	inputFile,
	outputFile,
	idDtoInput,
	deleteUnderPhoto,
	productDtoOutput,
	GetProductsInput,
	GetProductsSchema,
	deleteProductInput,
	newProductDtoInput,
	deleteProductOutput,
	paginatedProductsDtoOutput,
} from './dto/product'
import { ProductsService } from './products.service';
import { StorageService } from 'src/storage/storage.service';

@Router({ alias: 'products' })
export class ProductsRouter {
	constructor(private readonly productsService: ProductsService, private readonly storageService: StorageService) { }
	@Query({ input: idDtoInput, output: productDtoOutput })
	async getProductById(@Input() input: { id: string }) {
		try {
			const product = await this.productsService.findById(input.id);
			return product
		} catch (error) {
			console.error('Error fetching product by ID:', error);
			throw new TRPCError({
				message: 'An error occurred while fetching the plan.',
				code: 'INTERNAL_SERVER_ERROR',
			});
		}
	}
	@Query({ input: GetProductsSchema, output: paginatedProductsDtoOutput })
	async getAllProducts(@Input() { page, limit, sortField, sortOrder, search }: GetProductsInput) {
		const { items, total, totalPages, currentPage } = await this.productsService.getProducts(
			page,
			limit,
			sortField,
			sortOrder,
			search
		);
		return { items, total, page, limit, totalPages, currentPage }
	}
	@Mutation({ input: deleteProductInput, output: deleteProductOutput })
	async deleteProduct(@Input() dto: DeleteProductInput): Promise<DeleteProductOutput> {
		try {
			await this.productsService.delete(dto.id);
			await this.storageService.deleteFile(dto.underPhoto);
			return 'ok';
		} catch (error) {
			console.error('Error delete plan:', error);
			throw new TRPCError({
				message: 'An error occurred while delete the plan.',
				code: 'INTERNAL_SERVER_ERROR',
			});
		}
	}
	@Mutation({ input: deleteUnderPhoto, output: deleteProductOutput })
	async deleteUnderPhoto(@Input() dto: DeleteUnderPhotoInput): Promise<DeleteProductOutput> {
		try {
			dto.underPhoto && (await this.storageService.deleteFile(dto.underPhoto));
			return 'ok';
		} catch (error) {
			console.error('Error delete photo:', error);
			throw new TRPCError({
				message: 'An error occurred while delete the photo.',
				code: 'INTERNAL_SERVER_ERROR',
			});
		}
	}
	@Mutation({ input: newProductDtoInput, output: productDtoOutput })
	async addProduct(@Input() dto: NewProduct): Promise<FullProduct | null> {
		try {
			return await this.productsService.add(dto);
		} catch (error) {
			console.error('Error adding file:', error);
			throw new TRPCError({
				message: 'An error occurred while adding the file.',
				code: 'INTERNAL_SERVER_ERROR',
			});
		}
	}
	@Mutation({ input: productDtoOutput, output: productDtoOutput })
	async changeProduct(@Input() dto: FullProduct): Promise<FullProduct | null> {
		try {
			return await this.productsService.update(dto);
		} catch (error) {
			console.error('Error adding file:', error);
			throw new TRPCError({
				message: 'An error occurred while changing the file.',
				code: 'INTERNAL_SERVER_ERROR',
			});
		}
	}
	@Mutation({ input: inputFile, output: outputFile })
	async addFile(@Input() file: File): Promise<string> {
		const buffer = Buffer.from(file.base64, 'base64');
		try {
			return await this.storageService.uploadFile(buffer, file.name, 'underPhoto');
		} catch (error) {
			console.error('Error adding file:', error);
			throw new TRPCError({
				message: 'An error occurred while adding the file.',
				code: 'INTERNAL_SERVER_ERROR',
			});
		}
	}
}
