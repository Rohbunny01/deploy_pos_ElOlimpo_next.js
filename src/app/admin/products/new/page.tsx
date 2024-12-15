import AddProductForm from '@/components/products/AddProductForm';
import ProductForm from '@/components/products/ProductForm';
import Heading from '@/components/ui/Heading';
import Link from 'next/link';
import React from 'react';

export default function NewProductPage() {
	return (
		<>
			<Link
				href="/admin/products?page=1"
				className="rounded bg-green-400 font-bold px-10 py-2"
			>
				Volver
			</Link>
			<Heading>Nuevo producto</Heading>
			<AddProductForm>
				<ProductForm />
			</AddProductForm>
		</>
	);
}
