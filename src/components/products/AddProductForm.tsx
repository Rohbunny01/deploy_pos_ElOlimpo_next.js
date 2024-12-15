'use client';

import React, { useActionState, useEffect } from 'react';
import ProductForm from './ProductForm';
import { addProduct } from '../../../actions/add-product-action';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function AddProductForm({ children }: { children: React.ReactNode }) {
	const router = useRouter();

	const [state, dispatch] = useActionState(addProduct, {
		errors: [],
		success: '',
	});

	useEffect(() => {
		if (state.errors) {
			state.errors.forEach((error) => toast.error(error));
		}
		if (state.success) {
			toast.success(state.success);
			// Redirige al usuario a la página de productos después de crear uno nuevo
			// router.push('/products');
		}
	}, [state]);

	return (
		<form className="space-y-5" action={dispatch}>
			{children}

			<input
				type="submit"
				value="Crear producto"
				className="rounded bg-green-400 font-bold w-full py-2 cursor-pointer"
			/>
		</form>
	);
}
