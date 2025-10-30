import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();
const publicProcedure = t.procedure;

const appRouter = t.router({
  products: t.router({
    getProductById: publicProcedure.input(z
      .object({
        id: z.string(),
      })
      .required()).output(z.object({
        name: z.string().min(1, 'Название обязательно'),
        description: z.string().min(1, 'Описание обязательно'),
        price: z.number().min(0, 'Цена не может быть отрицательной'),
        priceDiscount: z.number().min(0, 'Скидка не может быть отрицательной'),
        articleNumber: z.string().min(1, 'Артикул обязателен'),
        underPhoto: z.string().min(1, 'Изображение обязательно'),
      }).extend({
        id: z.string(),
      })).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    getAllProducts: publicProcedure.input(z.object({
      page: z.number().default(1),
      limit: z.number().default(10),
      sortField: z.enum(['name', 'price', 'priceDiscount', 'articleNumber']).default('name'),
      sortOrder: z.enum(['asc', 'desc']).default('asc'),
      search: z.string().optional(),
    })).output(z.object({
      items: z.array(z.object({
        name: z.string().min(1, 'Название обязательно'),
        description: z.string().min(1, 'Описание обязательно'),
        price: z.number().min(0, 'Цена не может быть отрицательной'),
        priceDiscount: z.number().min(0, 'Скидка не может быть отрицательной'),
        articleNumber: z.string().min(1, 'Артикул обязателен'),
        underPhoto: z.string().min(1, 'Изображение обязательно'),
      }).extend({
        id: z.string(),
      })),
      total: z.number().int().nonnegative(),
      page: z.number().int().min(1),
      limit: z.number().int().min(1).max(100),
      totalPages: z.number().int().min(0),
      currentPage: z.number().int()
    })).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    deleteProduct: publicProcedure.input(z.object({
      id: z.string(),
      underPhoto: z.string(),
    })).output(z.string()).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    deleteUnderPhoto: publicProcedure.input(z.object({
      underPhoto: z.string(),
    })).output(z.string()).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    addProduct: publicProcedure.input(z.object({
      name: z.string().min(1, 'Название обязательно'),
      description: z.string().min(1, 'Описание обязательно'),
      price: z.number().min(0, 'Цена не может быть отрицательной'),
      priceDiscount: z.number().min(0, 'Скидка не может быть отрицательной'),
      articleNumber: z.string().min(1, 'Артикул обязателен'),
      underPhoto: z.string().min(1, 'Изображение обязательно'),
    })).output(z.object({
      name: z.string().min(1, 'Название обязательно'),
      description: z.string().min(1, 'Описание обязательно'),
      price: z.number().min(0, 'Цена не может быть отрицательной'),
      priceDiscount: z.number().min(0, 'Скидка не может быть отрицательной'),
      articleNumber: z.string().min(1, 'Артикул обязателен'),
      underPhoto: z.string().min(1, 'Изображение обязательно'),
    }).extend({
      id: z.string(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    changeProduct: publicProcedure.input(z.object({
      name: z.string().min(1, 'Название обязательно'),
      description: z.string().min(1, 'Описание обязательно'),
      price: z.number().min(0, 'Цена не может быть отрицательной'),
      priceDiscount: z.number().min(0, 'Скидка не может быть отрицательной'),
      articleNumber: z.string().min(1, 'Артикул обязателен'),
      underPhoto: z.string().min(1, 'Изображение обязательно'),
    }).extend({
      id: z.string(),
    })).output(z.object({
      name: z.string().min(1, 'Название обязательно'),
      description: z.string().min(1, 'Описание обязательно'),
      price: z.number().min(0, 'Цена не может быть отрицательной'),
      priceDiscount: z.number().min(0, 'Скидка не может быть отрицательной'),
      articleNumber: z.string().min(1, 'Артикул обязателен'),
      underPhoto: z.string().min(1, 'Изображение обязательно'),
    }).extend({
      id: z.string(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    addFile: publicProcedure.input(z.object({
      base64: z.string(),
      name: z.string(),
    })).output(z.string()).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  })
});
export type AppRouter = typeof appRouter;

