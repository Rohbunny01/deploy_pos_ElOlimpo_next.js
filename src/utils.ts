// Esta función toma un número y lo convierte en formato de precio chileno
// Por ejemplo: 1000 se convierte en "$1.000"
export function formatPrice(amount: number) {
	return new Intl.NumberFormat('es-CL', {
		style: 'currency',
		currency: 'CLP',
	}).format(amount);
}

// Esta función verifica si un número de página es válido
// Comprueba varias cosas:
// - Que no sea nulo
// - Que sea un número real
// - Que sea mayor que 0
// - Que sea un número entero (sin decimales)
export function isValidPage(value: number) {
	if (value == null) {
		return false;
	}

	if (typeof value !== 'number' && isNaN(value)) {
		return false;
	}
	if (value <= 0) {
		return false;
	}

	if (!Number.isInteger(value)) {
		return false;
	}

	return true;
}

// Esta función maneja las rutas de las imágenes
// Si la imagen ya está en Cloudinary (un servicio de almacenamiento de imágenes),
// la deja tal cual está
// Si no, construye una ruta completa para encontrar la imagen en nuestro servidor
export function getImagePath(image: string) {
	const cloudinaryBaseUrl = 'https://res.cloudinary.com';
	if (image.startsWith(cloudinaryBaseUrl)) {
		return image;
	} else {
		if (process.env.API_URL) {
			return `${process.env.API_URL}/img/${image}`;
		} else {
			return `${process.env.NEXT_PUBLIC_API_URL}/img/${image}`;
		}
	}
}

// Esta función simple nos dice si un producto está disponible
// Comprueba si hay más de 0 unidades en inventario
export const isAvailable = (inventory: number) => inventory > 0;
