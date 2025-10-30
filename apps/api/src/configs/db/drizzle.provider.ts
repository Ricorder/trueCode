import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from './schema';

export const DrizzleAsyncProvider = Symbol('drizzleProvider');
export const drizzleProvider = [
	{
		provide: DrizzleAsyncProvider,
		inject: [ConfigService],
		useFactory: async (configService: ConfigService) => {
			const { Client } = pg;
			const opts = {
				user: configService.get<string>('DB_USER'),
				password: configService.get<string>('DB_PASSWORD'),
				host: configService.get<string>('DB_HOST'),
				port: configService.get<number>('DB_PORT'),
				database: configService.get<string>('DB_NAME'),
			};
			const client = new Client(opts);
			const db = drizzle(client, { schema });
			await client.connect();
			return db;
		},
		exports: [DrizzleAsyncProvider],
	},
];
