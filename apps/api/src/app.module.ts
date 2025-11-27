import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TrpcModule } from './configs/trpc/trpc.module';
import { ProductsModule } from './products/products.module';
import { StorageModule } from './storage/storage.module';
import { DrizzleModule } from './configs/db/drizzle.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ['.env'],
		}),
		TrpcModule,
		DrizzleModule,
		ProductsModule,
		StorageModule,
	],
})
export class AppModule {}
