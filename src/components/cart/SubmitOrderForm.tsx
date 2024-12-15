// Este componente es como un formulario de pedido en un restaurante
import React, { useActionState, useEffect } from 'react';
import { submitOrder } from '../../../actions/submit-order-action';
import { useStore } from '@/store';
import { toast } from 'react-toastify';

export default function SubmitOrderForm() {
	const total = useStore((state) => state.total);
	const coupon = useStore((state) => state.coupon.name);
	const contents = useStore((state) => state.contents);
	const clearOrder = useStore((state) => state.clearOrder);

	// Juntamos todo en un "ticket" de pedido
	const order = {
		total,
		coupon,
		contents,
	};
	// Es como preparar el pedido para enviarlo a la cocina
	const submitOrderWithData = submitOrder.bind(null, order);

	// Este estado es como tener un mesero que nos dice si todo está bien o hay problemas
	const [state, dispatch] = useActionState(submitOrderWithData, {
		errors: [], // Lista de problemas que pueden surgir
		success: '', // Mensaje de éxito cuando todo sale bien
	});

	// Este useEffect es como tener un sistema de notificaciones
	// Similar a cuando el mesero viene a decirnos si hay algún problema
	// o si todo está listo
	useEffect(() => {
		if (state.errors) {
			// Si hay errores, muestra cada uno como una notificación roja
			state.errors.forEach((error) => {
				toast.error(error);
			});
		}
		if (state.success) {
			// Si todo salió bien, muestra una notificación verde
			// y limpia la mesa (resetea el pedido)
			toast.success(state.success);
			clearOrder();
		}
	}, [state, clearOrder]);

	// El formulario es como el botón final para enviar el pedido a la cocina
	return (
		<>
			<form action={dispatch}>
				<input
					type="submit"
					value="Confirmar pedido"
					className="mt-5 w-full rounded-md bg-indigo-600 hover:border-indigo-700 px-4 py-2 text-white font-bold uppercase p-3 cursor-pointer "
				/>
			</form>
		</>
	);
}
