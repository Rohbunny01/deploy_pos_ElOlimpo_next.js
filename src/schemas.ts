/**
 * Esquemas de validación usando Zod para la aplicación
 */

import { boolean, z } from 'zod';

/**
 * Esquema que define la estructura de un producto
 * @property {number} id - Identificador único del producto
 * @property {string} name - Nombre del producto
 * @property {string} image - URL de la imagen del producto
 * @property {number} price - Precio del producto (convertido automáticamente a número)
 * @property {number} inventory - Cantidad disponible en inventario
 * @property {number} categoryId - ID de la categoría a la que pertenece el producto
 */
export const ProductSchema = z.object({
	id: z.number(),
	name: z.string(),
	image: z.string(),
	price: z.coerce.number(),
	inventory: z.number(),
	categoryId: z.number(),
});

export const ProductsResponseSchema = z.object({
	productos: z.array(ProductSchema),
	total: z.number(),
});

/**
 * Esquema que define la estructura básica de una categoría
 * @property {number} id - Identificador único de la categoría
 * @property {string} name - Nombre de la categoría
 */
export const CategorySchema = z.object({
	id: z.number(),
	name: z.string(),
});

export const CategoriesResponseSchema = z.array(CategorySchema);

/**
 * Esquema extendido de categoría que incluye sus productos relacionados
 * @property {ProductSchema[]} products - Array de productos que pertenecen a la categoría
 */
export const CategoryWithProductsResponseSchema = CategorySchema.extend({
	products: z.array(ProductSchema),
});

/* Shopping Cart */
const ShoppingCartContentsSchema = ProductSchema.pick({
	name: true,
	image: true,
	price: true,
	inventory: true,
}).extend({
	productId: z.number(),
	quantity: z.number(),
});
export const ShoppingCartSchema = z.array(ShoppingCartContentsSchema);

export const CouponResponseSchema = z.object({
	name: z.string().default(''),
	message: z
		.union([z.string(), z.array(z.string())])
		.transform((val) => (Array.isArray(val) ? val[0] : val)),
	porcentaje: z.coerce.number().min(0).max(100).default(0),
	id: z.number().optional(),
	expirationDate: z.string().optional(),
});

const OrderContentSchema = z.object({
	productId: z.number(),
	quantity: z.number(),
	price: z.number(),
});
export const OrderSchema = z.object({
	total: z.number(),
	coupon: z.string(),
	contents: z
		.array(OrderContentSchema)
		.min(1, { message: 'El Carrito no puede ir vacio' }),
});

/** Success / Error Response */
export const SuccessResponseSchema = z.object({
	message: z.string(),
});
export const ErrorResponseSchema = z.object({
	message: z.array(z.string()),
	error: z.string(),
	statusCode: z.number(),
});

export const ContentsSchema = z.object({
	id: z.number(),
	quantity: z.number(),
	price: z.string(),
	product: ProductSchema,
});
export const TransactionResponseSchema = z.object({
	id: z.number(),
	total: z.string(),
	coupon: z.string().nullable(),
	discount: z.string().nullable(),
	transactionDate: z.string(),
	contents: z.array(ContentsSchema),
});

export const TransactionsResponseSchema = z.array(TransactionResponseSchema);

export const ProductFormSchema = z.object({
	name: z.string().min(1, { message: 'El Nombre del Producto no puede ir vacio' }),
	price: z.coerce
		.number({ message: 'Precio no válido' })
		.min(1, { message: 'El Precio debe ser mayor a 0' }),
	image: z.string({ message: 'La Imagen es requerida' }),
	inventory: z.coerce
		.number({ message: 'Inventario no válido' })
		.min(1, { message: 'El inventario debe ser mayor a 0' }),
	categoryId: z.coerce.number({ message: 'La Categoria no es válida' }),
});

export type Product = z.infer<typeof ProductSchema>;
export type ShoppingCart = z.infer<typeof ShoppingCartSchema>;
export type CartItem = z.infer<typeof ShoppingCartContentsSchema>;
export type Coupon = z.infer<typeof CouponResponseSchema>;
export type Transaction = z.infer<typeof TransactionResponseSchema>;
