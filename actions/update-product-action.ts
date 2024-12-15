// 🛠️ **HERRAMIENTA PARA ACTUALIZAR PRODUCTOS**
// Esta función se encarga de actualizar la información de un producto en la base de datos mediante una API.

'use server'; // 🚦 Indicamos que esta función se ejecutará en el servidor.

import { ErrorResponseSchema, Product, ProductFormSchema } from '@/schemas';
// 📜 Importamos:
// - `ErrorResponseSchema`: Estructura para manejar errores.
// - `Product`: Información básica sobre los productos.
// - `ProductFormSchema`: Reglas para validar datos del producto.

type ActionStateType = {
	errors: string[]; // 📋 Lista de errores encontrados (si los hay).
	success: string; // ✅ Mensaje de éxito (si todo salió bien).
};

// ✨ **FUNCIÓN PRINCIPAL**
// Esta función actualiza un producto con nueva información.
export async function updateProduct(
	productId: Product['id'], // 🆔 ID del producto que se quiere actualizar.
	prevState: ActionStateType, // 🛠️ Estado anterior: errores y mensajes.
	formData: FormData, // 📤 Datos del formulario con la nueva información.
) {
	// 🔍 **VALIDACIÓN DE DATOS**
	// Verificamos que la información en `formData` cumpla con las reglas de `ProductFormSchema`.
	const product = ProductFormSchema.safeParse({
		name: formData.get('name'), // 📛 Nombre del producto.
		price: formData.get('price'), // 💰 Precio del producto.
		inventory: formData.get('inventory'), // 📦 Cantidad disponible en el inventario.
		categoryId: formData.get('categoryId'), // 🗂️ Categoría del producto.
		image: formData.get('image'), // 🖼️ Imagen del producto.
	});

	// ❌ **MANEJO DE ERRORES EN VALIDACIÓN**
	// Si los datos no son válidos, devolvemos los errores encontrados.
	if (!product.success) {
		return {
			errors: product.error.issues.map((issue) => issue.message), // 🛑 Lista de errores.
			success: '', // Sin éxito porque hay errores.
		};
	}

	// 🌐 **LLAMADO A LA API**
	// Construimos la URL del producto que queremos actualizar.
	const url = `${process.env.API_URL}/products/${productId}`;

	// 📤 Enviamos la solicitud PUT con los datos validados.
	const req = await fetch(url, {
		method: 'PUT', // ✍️ Tipo de solicitud: actualizar (PUT).
		headers: {
			'Content-Type': 'application/json', // 📄 Indicamos que enviamos datos JSON.
		},
		body: JSON.stringify(product.data), // 🗂️ Convertimos los datos en texto JSON.
	});

	// 🔄 **RESPUESTA DE LA API**
	// Convertimos la respuesta de la API en un objeto JSON.
	const json = await req.json();

	// ❌ **MANEJO DE ERRORES DE LA API**
	// Si la solicitud no fue exitosa, extraemos los errores.
	if (!req.ok) {
		const errors = ErrorResponseSchema.parse(json); // 🛑 Validamos el formato de los errores.
		return {
			errors: errors.message.map((issue) => issue), // Lista de errores devueltos por la API.
			success: '', // Sin éxito porque hubo un problema.
		};
	}

	// ✅ **TODO SALIÓ BIEN**
	// Devolvemos un mensaje de éxito si el producto se actualizó correctamente.
	return {
		errors: [], // Sin errores.
		success: 'Producto actualizado correctamente', // 🥳 Todo funcionó.
	};
}
