import { Logger, Module } from '@nestjs/common';
import { StorageService } from '../storage/storage.service';
import { ProductsRouter } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';

@Module({
	providers: [StorageService, Logger, ProductsRouter, ProductsService, ProductsRepository],
})
export class ProductsModule { }
