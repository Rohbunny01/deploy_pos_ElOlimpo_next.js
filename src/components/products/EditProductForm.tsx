'use client';
import { useParams, useRouter } from 'next/navigation';
import React, { useActionState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { updateProduct } from '../../../actions/update-product-action';

export default function EditProductForm({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const { id } = useParams<{ id: string }>();

	const updateProductWithId = updateProduct.bind(null, +id);
	const [state, dispatch] = useActionState(updateProductWithId, {
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
			router.push('/admin/products');
		}
	}, [state, router]);

	return (
		<form className="space-y-5" action={dispatch}>
			{children}

			<input
				type="submit"
				value="Guardar cambios"
				className="rounded bg-green-400 font-bold w-full py-2 cursor-pointer"
			/>
		</form>
	);
}
