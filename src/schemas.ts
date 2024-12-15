/**
 * Archivo de esquemas de validación usando Zod para la aplicación de tienda en línea.
 * Define las estructuras de datos y sus validaciones.
 */

import { boolean, z } from 'zod';

/**
 * Esquema que define la estructura de un producto
 * @property {number} id - Identificador único del producto
 * @property {string} name - Nombre del producto
 * @property {string} image - URL de la imagen del producto
 * @property {number} price - Precio del producto
 * @property {number} inventory - Cantidad disponible en inventario
 * @property {number} categoryId - ID de la categoría asociada
 */
export const ProductSchema = z.object({
	id: z.number(),
	name: z.string(),
	image: z.string(),
	price: z.coerce.number(),
	inventory: z.number(),
	categoryId: z.number(),
});

/**
 * Esquema para la respuesta de productos
 * @property {Product[]} productos - Lista de productos
 * @property {number} total - Total de productos
 */
export const ProductsResponseSchema = z.object({
	productos: z.array(ProductSchema),
	total: z.number(),
});

/**
 * Esquema que define una categoría básica
 * @property {number} id - Identificador único de la categoría
 * @property {string} name - Nombre de la categoría
 */
export const CategorySchema = z.object({
	id: z.number(),
	name: z.string(),
});

/**
 * Esquema para la respuesta de categorías
 * Retorna un array de categorías
 */
export const CategoriesResponseSchema = z.array(CategorySchema);

/**
 * Esquema de categoría con sus productos relacionados
 * Extiende CategorySchema añadiendo la lista de productos
 */
export const CategoryWithProductsResponseSchema = CategorySchema.extend({
	products: z.array(ProductSchema),
});

/**
 * Esquema para los elementos del carrito de compras
 * Incluye información básica del producto y cantidad seleccionada
 */
const ShoppingCartContentsSchema = ProductSchema.pick({
	name: true,
	image: true,
	price: true,
	inventory: true,
}).extend({
	productId: z.number(),
	quantity: z.number(),
});

/**
 * Esquema del carrito de compras completo
 * Array de elementos del carrito
 */
export const ShoppingCartSchema = z.array(ShoppingCartContentsSchema);

/**
 * Esquema para cupones de descuento
 * @property {string} name - Nombre del cupón
 * @property {string} message - Mensaje informativo
 * @property {number} porcentaje - Porcentaje de descuento (0-100)
 * @property {number} id - ID opcional del cupón
 * @property {string} expirationDate - Fecha de vencimiento opcional
 */
export const CouponResponseSchema = z.object({
	name: z.string().default(''),
	message: z
		.union([z.string(), z.array(z.string())])
		.transform((val) => (Array.isArray(val) ? val[0] : val)),
	porcentaje: z.coerce.number().min(0).max(100).default(0),
	id: z.number().optional(),
	expirationDate: z.string().optional(),
});

/**
 * Esquema para el contenido de una orden
 */
const OrderContentSchema = z.object({
	productId: z.number(),
	quantity: z.number(),
	price: z.number(),
});

/**
 * Esquema para órdenes de compra
 * @property {number} total - Monto total
 * @property {string} coupon - Cupón aplicado
 * @property {OrderContent[]} contents - Productos en la orden
 */
export const OrderSchema = z.object({
	total: z.number(),
	coupon: z.string(),
	contents: z
		.array(OrderContentSchema)
		.min(1, { message: 'El Carrito no puede ir vacio' }),
});

/**
 * Esquemas para respuestas de éxito y error
 */
export const SuccessResponseSchema = z.object({
	message: z.string(),
});

export const ErrorResponseSchema = z.object({
	message: z.array(z.string()),
	error: z.string(),
	statusCode: z.number(),
});

/**
 * Esquema para el contenido de una transacción
 */
export const ContentsSchema = z.object({
	id: z.number(),
	quantity: z.number(),
	price: z.string(),
	product: ProductSchema,
});

/**
 * Esquema para transacciones completadas
 */
export const TransactionResponseSchema = z.object({
	id: z.number(),
	total: z.string(),
	coupon: z.string().nullable(),
	discount: z.string().nullable(),
	transactionDate: z.string(),
	contents: z.array(ContentsSchema),
});

/**
 * Esquema para respuesta de múltiples transacciones
 */
export const TransactionsResponseSchema = z.array(TransactionResponseSchema);

/**
 * Esquema para el formulario de productos
 * Incluye validaciones para cada campo
 */
export const ProductFormSchema = z.object({
	name: z.string().min(1, { message: 'El Nombre del Producto no puede ir vacio' }),
	price: z.coerce
		.number({ message: 'Precio no válido' })
		.min(1, { message: 'El Precio debe ser mayor a 0' }),
	//image: z.string({ message: 'La Imagen es requerida' }),
	inventory: z.coerce
		.number({ message: 'Inventario no válido' })
		.min(1, { message: 'El inventario debe ser mayor a 0' }),
	categoryId: z.coerce.number({ message: 'La Categoria no es válida' }),
});

/**
 * Exportación de tipos TypeScript inferidos de los esquemas
 */
export type Product = z.infer<typeof ProductSchema>;
export type ShoppingCart = z.infer<typeof ShoppingCartSchema>;
export type CartItem = z.infer<typeof ShoppingCartContentsSchema>;
export type Coupon = z.infer<typeof CouponResponseSchema>;
export type Transaction = z.infer<typeof TransactionResponseSchema>;
