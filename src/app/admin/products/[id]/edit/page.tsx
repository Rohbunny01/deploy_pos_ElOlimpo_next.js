import EditProductForm from '@/components/products/EditProductForm';
import ProductForm from '@/components/products/ProductForm';
import Heading from '@/components/ui/Heading';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import { ProductSchema } from '../../../../../schemas';

async function getProduct(id: string) {
	const url = `${process.env.API_URL}/products/${id}`;
	const req = await fetch(url);
	const json = await req.json();
	if (!req.ok) {
		notFound();
	}
	const product = ProductSchema.parse(json);
	return product;
}

type Params = Promise<{ id: string }>;

export default async function EditProductPage({ params }: { params: Params }) {
	const { id } = await params;
	const product = await getProduct(id);

	return (
		<>
			<Link
				href="/admin/products?page=1"
				className="rounded bg-green-400 font-bold px-10 py-2"
			>
				Volver
			</Link>
			<Heading>Editar producto: {product.name}</Heading>

			<EditProductForm>
				<ProductForm product={product} />
			</EditProductForm>
		</>
	);
}
