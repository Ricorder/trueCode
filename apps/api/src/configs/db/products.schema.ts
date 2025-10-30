import { integer, pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
		id: uuid().defaultRandom().primaryKey().notNull(),
		name: text().notNull(),
		description: text().notNull(),
		price: integer().notNull(),
		priceDiscount: integer().notNull(),
		articleNumber: text().notNull(),
		underPhoto: text().notNull(),
		createdAt: timestamp().defaultNow().notNull(),
		updatedAt: timestamp().defaultNow().notNull(),
	},
);
