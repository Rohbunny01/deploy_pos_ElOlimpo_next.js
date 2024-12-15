import { Product } from '@/schemas';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import React from 'react';

export default function DeleteProductForm({ productId }: { productId: number }) {
	const handleDeleteProduct = async (formData: FormData) => {
		'use server';
		const productId = formData.get('productId');
		const url = `${process.env.API_URL}/products/${productId}`;
		const req = await fetch(url, {
			method: 'DELETE',
		});
		await req.json();
		revalidatePath('/admin/products');
	};

	return (
		<form action={handleDeleteProduct}>
			<input type="hidden" name="productId" value={productId} />
			<input
				type="submit"
				className="text-red-600 hover:text-red-800 cursor-pointer"
				value="Eliminar"
			/>
		</form>
	);
}
