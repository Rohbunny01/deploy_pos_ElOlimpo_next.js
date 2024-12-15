'use client';
//antes de comentar
import { useStore } from '@/store';
import Amount from './Amount';
import ShoppingCartItem from './ShoppingCartItem';
import CouponForm from './CouponForm';
import SubmitOrderForm from './SubmitOrderForm';

// Este componente es como un carrito de supermercado físico
export default function ShoppingCart() {
	// Imagina estos como diferentes compartimentos de tu carrito:
	const contents = useStore((state) => state.contents); // Los productos que vas metiendo
	const total = useStore((state) => state.total); // La cuenta total
	const discount = useStore((state) => state.discount); // Los cupones de descuento

	return (
		<>
			{/* Es como revisar si el carrito está vacío o tiene productos */}
			{contents.length ? (
				<>
					{/* Como el título de tu ticket de compra */}
					<h2 className="text-4xl font-bold text-gray-900">Resumen de la compra</h2>

					{/* Esta lista es como los renglones de tu ticket */}
					<ul
						role="list"
						className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500"
					>
						{/* Por cada producto, crea una línea en el ticket */}
						{contents.map((item) => (
							<ShoppingCartItem key={item.productId} item={item} />
						))}
					</ul>

					{/* Esta sección es como el final del ticket donde ves los totales */}
					<dl className="mt-6 space-y-6 border-t border-gray-300 py-6 text-sm font-medium text-gray-800">
						{/* Si hay descuento, es como cuando te aplican un cupón */}
						{discount ? (
							<Amount label="Descuento" amount={discount} discount={true} />
						) : null}

						{/* El total final, como la última línea del ticket */}
						<Amount label="Total por pagar" amount={total} />
					</dl>

					{/* Formulario para cupones, como cuando entregas un cupón al cajero */}
					<CouponForm />

					{/* Formulario para finalizar la compra, como ir a la caja a pagar */}
					<SubmitOrderForm />
				</>
			) : (
				// Si el carrito está vacío, muestra este mensaje
				<p className="text-xl text-center text-gray-900">
					No hay productos en el carrito
				</p>
			)}
		</>
	);
}
