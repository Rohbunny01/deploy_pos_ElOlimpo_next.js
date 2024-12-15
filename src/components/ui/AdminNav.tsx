import Link from 'next/link';
import Logo from '@/components/ui/Logo';

export default function AdminNav() {
	return (
		<header className="px-4 sm:px-10 py-5 bg-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
			<div className="flex gap-5 text-white">
				<Logo />
			</div>

			<div className="flex flex-wrap justify-center gap-2 items-center">
				<Link
					href={'/admin/products'}
					className="rounded text-white font-bold p-2 hover:bg-gray-600"
				>
					Productos
				</Link>

				<Link
					href={'/admin/sales'}
					className="rounded text-white font-bold p-2 hover:bg-gray-600"
				>
					Ventas
				</Link>

				<Link
					href={'/'}
					className="rounded bg-green-400 font-bold py-2 px-10 hover:bg-green-500"
				>
					Tienda
				</Link>
			</div>
		</header>
	);
}
