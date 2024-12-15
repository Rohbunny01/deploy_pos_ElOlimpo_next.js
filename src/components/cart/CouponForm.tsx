'use client'; // 🚦 Esto le dice a React que estamos trabajando en un componente que se ejecuta en el navegador (el cliente).

// 🌳 IMPORTAR RECURSOS
// Importamos una función llamada `useStore` que actúa como nuestro árbol compartido de información.
// Piensa en esto como un tablón de anuncios: todos pueden escribir o leer cosas del tablón.
import { useStore } from '@/store';

// 📋 FORMULARIO DE CUPONES
export default function CouponForm() {
	// 🛠️ TOMAR LAS HERRAMIENTAS
	// `applyCoupon` es como un timbre que avisa cuando alguien quiere usar un cupón.
	const applyCoupon = useStore((state) => state.applyCoupon);
	// `coupon` es un buzón donde recibimos información sobre el cupón que se aplicó.
	const coupon = useStore((state) => state.coupon);

	// ✉️ CUANDO ENVÍAS EL CUPÓN
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); // 🚫 Detenemos al navegador para que no haga cosas que no necesitamos, como recargar la página.

		// 🧾 RECOGER INFORMACIÓN DEL FORMULARIO
		// Imagina que tienes un sobre con datos del formulario, eso es lo que hace `FormData`.
		const formData = new FormData(e.currentTarget);

		// 🔍 LEEMOS EL CUPÓN
		// Tomamos el contenido del "campo cupón" y lo pasamos a mayúsculas porque los códigos de cupón no son sensibles a mayúsculas.
		const couponName = (formData.get('coupon_name') as string).toUpperCase();

		// ❓ SI EL CUPÓN ESTÁ VACÍO, NOS DETENEMOS AQUÍ
		if (!couponName.length) return;

		// 🛎️ PROCESAMOS EL CUPÓN
		// Usamos `applyCoupon` para enviar el cupón a quien lo evalúa (como el gerente de una tienda).
		await applyCoupon(couponName);
	};

	// 🖼️ EL DISEÑO
	// Creamos un formulario con un cuadro de texto para ingresar el cupón y un botón para enviarlo.
	return (
		<>
			{/* 🏷️ Encabezado del formulario */}
			<p className="py-5 font-bold border-t border-gray-300">Canjear Cupón</p>

			{/* ✍️ Formulario para ingresar el cupón */}
			<form className="flex" onSubmit={handleSubmit}>
				<input
					type="text"
					className="p-2 bg-gray-200 border-gray-300 w-full" // 🎨 Esto controla cómo luce el cuadro de texto.
					placeholder="Ingresa un cupón" // 💡 Texto de ayuda para el usuario.
					name="coupon_name" // 🏷️ Identificación del campo para que podamos leerlo después.
				/>
				<input
					type="submit"
					className="p-3 bg-green-400 font-bold hover:cursor-pointer" // 🎨 Botón con estilo verde.
					value="Canjear" // 🔘 Texto del botón.
				/>
			</form>

			{/* 📬 Mensaje de resultado */}
			{/* Si hay un mensaje en el cupón (como éxito o error), lo mostramos aquí. */}
			{coupon.message ? (
				<p
					className={`py-4 text-center text-sm font-bold ${
						coupon.id ? 'text-green-500' : 'text-black' // ✅ Verde para éxito, negro para mensajes neutrales.
					}`}
				>
					{/* Mostramos el mensaje aquí. */}
					{coupon.message}
				</p>
			) : null}
		</>
	);
}
