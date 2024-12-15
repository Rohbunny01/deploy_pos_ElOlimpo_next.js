// Importaciones necesarias
import type { Metadata } from 'next';
import { Outfit } from 'next/font/google'; // Importamos la fuente Outfit de Google Fonts
import './globals.css';
import Providers from './providers';

// Configuración de la fuente Outfit
const outfit = Outfit({
	subsets: ['latin'], // Subconjunto de caracteres latinos
	variable: '--font-outfit', // Variable CSS para usar la fuente
});

// Metadatos de la aplicación
export const metadata: Metadata = {
	title: 'POS- El Olimpo',
	description: 'POS- El Olimpo',
};

// Componente principal de layout que envuelve toda la aplicación
export default function RootLayout({
	children, // Props que recibe los componentes hijos
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="es">
			{/* Configuración del idioma en español */}
			<body className={`${outfit.className} antialiased bg-gray-200`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
