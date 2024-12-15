import { formatPrice } from '@/utils'; // 🔢 Esto es como una calculadora especial que formatea los números para que se vean como precios (por ejemplo, "$1,000.00").

// 🎁 PROPIEDADES (INFORMACIÓN QUE SE LE PASA AL COMPONENTE)
type AmountProps = {
	label: string; // 🏷️ Es el nombre del concepto, como "Subtotal" o "Descuento".
	amount: number; // 💰 Es el valor asociado a ese concepto, como 1000 (representando dinero).
	discount?: boolean; // 🟢 Este campo indica si el monto es un descuento (es opcional).
};

// 💵 COMPONENTE "AMOUNT"
// Este componente muestra un concepto y su monto.
// Si es un descuento, lo destacará visualmente.
export default function Amount({ label, amount, discount }: AmountProps) {
	return (
		<div
			// 🎨 Cambiamos el color y el fondo si es un descuento.
			className={`${discount && 'text-green-900 bg-green-300'} flex justify-between p-1`}
		>
			{/* 🏷️ Mostrar el nombre del concepto */}
			<dd className="font-bold">{label}</dd>

			{/* 💰 Mostrar el monto formateado */}
			<dd className="text-gray-900">
				{discount && '-'} {/* ➖ Si es un descuento, agregamos un signo negativo. */}
				{formatPrice(amount)} {/* 💸 Formateamos el monto como un precio bonito. */}
			</dd>
		</div>
	);
}
