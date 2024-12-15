import React, { useActionState, useEffect } from 'react';
import { submitOrder } from '../../../actions/submit-order-action';
import { useStore } from '@/store';
import { toast } from 'react-toastify';

export default function SubmitOrderForm() {
	const total = useStore((state) => state.total);
	const coupon = useStore((state) => state.coupon.name);
	const contents = useStore((state) => state.contents);
	const clearOrder = useStore((state) => state.clearOrder);
	const order = {
		total,
		coupon,
		contents,
	};

	const submitOrderWithData = submitOrder.bind(null, order);

	const [state, dispatch] = useActionState(submitOrderWithData, {
		errors: [],
		success: '',
	});

	useEffect(() => {
		if (state.errors) {
			state.errors.forEach((error) => {
				toast.error(error);
			});
		}
		if (state.success) {
			toast.success(state.success);
			clearOrder();   
		}
	}, [state]);
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
