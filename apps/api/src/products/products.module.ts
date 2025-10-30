import { Logger, Module } from '@nestjs/common';
import { StorageService } from '../storage/storage.service';
import { DrizzleModule } from '../configs/db/drizzle.module';
import { drizzleProvider } from '../configs/db/drizzle.provider';
import { ProductsRouter } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';

@Module({
	imports: [DrizzleModule],
	providers: [StorageService, Logger, ProductsRouter, ProductsService, ProductsRepository, ...drizzleProvider],
})
export class ProductsModule { }
