// Este componente es como una tarjeta individual en tu carrito de supermercado
// que muestra toda la información de un producto
import Image from 'next/image';
import { CartItem } from '@/schemas';
import { useStore } from '@/store';
import { getImagePath } from '@/utils';

export default function ShoppingCartItem({ item }: { item: CartItem }) {
	// Estos son como los "permisos" para modificar los productos en el carrito
	const updateQuantity = useStore((state) => state.updateQuantity);
	const removeFromCart = useStore((state) => state.removeFromCart);

	return (
		// Esto es como el "contenedor físico" del producto en el carrito
		<li className="flex items-center space-x-6 py-6 relative">
			{/* Esta sección es como la foto del producto que verías en el estante */}
			<div className="relative h-24 w-24">
				<Image
					src={getImagePath(item.image)}
					alt={`Imagen del Producto ${item.name}`}
					fill
					sizes="(max-width: 96px) 100vw, 96px"
					className="object-cover"
					priority
				/>
			</div>

			{/* Esta es como la etiqueta de información del producto */}
			<div className="flex-auto space-y-2">
				{/* Nombre del producto */}
				<h3 className="text-gray-900">{item.name}</h3>
				{/* Precio del producto */}
				<p>${item.price}</p>
				{/* Este selector es como cuando decides cuántas unidades quieres llevar */}
				<select
					className="w-32 text-center p-2 rounded-lg bg-gray-100"
					value={item.quantity}
					onChange={(e) => updateQuantity(item.productId, Number(e.target.value))}
					aria-label="Cantidad del producto"
				>
					{/* Esto genera opciones basadas en el inventario disponible */}
					{Array.from({ length: item.inventory }, (_, index) => index + 1).map(
						(number) => (
							<option key={number} value={number}>
								{number}
							</option>
						),
					)}
				</select>
			</div>

			{/* Este es como el botón para devolver el producto al estante */}
			<div className="absolute top-10 -right-0">
				<button
					type="button"
					onClick={() => removeFromCart(item.productId)}
					aria-label="Eliminar producto"
				>
					{/* Icono de X en un círculo para eliminar */}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="w-8 h-8 text-red-500"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</button>
			</div>
		</li>
	);
}
