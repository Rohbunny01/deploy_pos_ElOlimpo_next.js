import { Transaction } from '@/schemas';
import { formatPrice, getImagePath } from '@/utils';
import Image from 'next/image';

// 🛒 **RESUMEN DE TRANSACCIONES**
// Este componente muestra información detallada de una transacción.
export default function TransactionSummary({
	transaction,
}: {
	transaction: Transaction;
}) {
	return (
		<>
			{/* 📋 **CONTENEDOR PRINCIPAL** */}
			<div className="mb-6  text-sm font-medium text-gray-500 border border-gray-200">
				<p className="text-sm font-black text-gray-900 p-2 bg-gray-200 ">
					ID: {transaction.id}{' '}
				</p>
				{/* 🛍️ **LISTA DE PRODUCTOS DE LA TRANSACCIÓN** */}
				<ul
					role="list"
					className="divide-y divide-gray-200 border-t border-gray-200 border-b"
				>
					{/* 🔄 Recorremos los productos comprados en esta transacción */}
					{transaction.contents.map((item) => (
						<li key={item.id} className="p-5 ">
							<div className="flex items-center space-x-6 ">
								<div className="relative w-32 h-32">
									<Image
										src={getImagePath(item.product.image)}
										alt={`Imagen de ${item.product.name}`}
										fill
										className="absolute object-cover rounded-lg"
										priority
									/>
								</div>
								<div className="flex-auto space-y-1 ">
									<h3 className="text-gray-900">{item.product.name}</h3>
									<p className="text-lg font-extrabold  text-gray-900">
										{formatPrice(+item.price)}
									</p>
									<p className="text-lg  text-gray-900">Cantidad: {item.quantity}</p>{' '}
									{/* 🔢 Cantidad */}
								</div>
							</div>
						</li>
					))}
				</ul>
				{/* 🧾 **DETALLES DE LA TRANSACCIÓN** */}
				<dl className="space-y-6  text-sm font-medium text-gray-500 p-5">
					{/* 🎟️ Si se usó un cupón, mostramos la información */}
					{transaction.coupon && (
						<>
							<div className="flex justify-between">
								<dt>Cupón Utilizado</dt>
								<dd className="text-gray-900">{transaction.coupon}</dd>
							</div>

							<div className="flex justify-between">
								<dt>Descuento</dt>
								<dd className="text-gray-900">
									{formatPrice(+(transaction.discount ?? 0))}
								</dd>
							</div>
						</>
					)}

					{/* 💰 **TOTAL DE LA TRANSACCIÓN** */}
					<div className="flex justify-between">
						<dt className="text-lg text-black font-black">Total</dt>
						<dd className="text-lg text-black font-black">
							{formatPrice(+transaction.total)}
						</dd>
					</div>
				</dl>
			</div>
		</>
	);
}
