import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	dialect: 'postgresql',
	casing: 'camelCase',
	schema: './src/configs/db/schema.ts',
	out: './drizzle',
	dbCredentials: {
		ssl: false,
		url: `${process.env.DATABASE_URL}?sslmode=disable`,
	},
});
