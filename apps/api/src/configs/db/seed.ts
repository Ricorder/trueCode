import { drizzle } from 'drizzle-orm/node-postgres';
import { seed } from 'drizzle-seed';
import { faker } from '@faker-js/faker';
import 'dotenv/config';
import { products } from './schema';

async function main() {
	const db = drizzle(process.env.DATABASE_URL!);
	await seed(db, { products }).refine((f) => ({
		products: {
			count: 100,
			columns: {
				name: f.default({ defaultValue: faker.commerce.productName() }),
				description: f.default({ defaultValue: faker.commerce.productDescription() }),
				price: f.default({ defaultValue: faker.commerce.price({ min: 1000, max: 50000, dec: 0 }) }),
				priceDiscount: f.default({ defaultValue: parseInt(faker.commerce.price({ min: 1000, max: 50000, dec: 0 }))}),
				articleNumber: f.default({ defaultValue: faker.string.alphanumeric({ length: 8 }).toUpperCase()}),
				underPhoto: f.default({ defaultValue: faker.image.urlPicsumPhotos({ width: 250, height: 250 }) }),
			},
		},
	}));
}

main().catch((error: Error) => {
	console.error('❌ Ошибка при посеве данных:', error.message);
});
