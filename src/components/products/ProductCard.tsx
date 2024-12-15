import { Product } from '@/schemas';
import { formatPrice, getImagePath, isAvailable } from '@/utils';
import Image from 'next/image';
import AddProductButton from './AddProductButton';
export default function ProductCard({ product }: { product: Product }) {
	return (
		<div className="rounded bg-white shadow relative p-5">
			<div
				className={`${
					!isAvailable(product.inventory)
						? 'bg-red-100 opacity-40 rounded-lg'
						: 'bg-green-100 rounded-lg'
				}`}
			>
				<div className="relative w-full aspect-square">
					<Image
						src={getImagePath(product.image)}
						alt={`Imagen del producto ${product.name}`}
						fill
						sizes="(max-width: 768px) 100vw, 400px"
						className="object-cover rounded"
						priority
					/>
				</div>
				<div className="p-3 space-y-2">
					<h3 className="text-xl font-bold text-gray-600">{product.name}</h3>
					<p className="text-gray-500">Disponibles: {product.inventory}</p>
					<p className="text-2xl font-extrabold  text-gray-900">
						{formatPrice(product.price)}
					</p>
				</div>
			</div>
			{isAvailable(product.inventory) ? (
				<AddProductButton product={product} />
			) : (
				<p className="text-red-600 text-5xl font-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-white p-5 opacity-60 w-full uppercase ">
					No disponible
				</p>
			)}
		</div>
	);
}
