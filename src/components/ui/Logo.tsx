import Link from 'next/link';

export default function Logo() {
	return (
		<Link href="/" className="cursor-pointer">
			<h1 className="text-3xl font-extrabold text-white">
				EL
				<span className="text-green-400 text-xl">Olimpo</span>
			</h1>
		</Link>
	);
}
