import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, type NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter({
			maxParamLength: 5000,
			bodyLimit: 50 * 1024 * 1024,
		}),
	);
	app.enableCors({
		origin: ['http://localhost:3000'],
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true,
	});
	const configService = app.get(ConfigService);
	const PORT = configService.get<number>('API_PORT');
	await app.listen(PORT, '0.0.0.0');
}
export const appRouter = bootstrap();
