'use client'; // 🔧 Esto significa que este código funciona en el navegador.

// 🌟 IMPORTACIONES
// Estas son herramientas y recursos que el código necesita para funcionar.
import { useState } from 'react'; // 🛠️ Una herramienta que permite guardar y cambiar valores en el componente.
import Calendar from 'react-calendar'; // 📅 Una herramienta que muestra un calendario.
import 'react-calendar/dist/Calendar.css'; // 🎨 Estilo necesario para que el calendario se vea bonito.
import { format } from 'date-fns'; // ⏰ Herramienta para cambiar cómo se ven las fechas.
import { useQuery } from '@tanstack/react-query'; // 🔄 Herramienta que ayuda a traer datos de internet.
import { getSalesByDate } from '@/api'; // 📦 Función que busca ventas según una fecha.
import TransactionSummary from './TransactionSummary'; // 🧾 Muestra detalles de una venta.
import { formatPrice } from '@/utils'; // 💰 Convierte números en precios con formato.

type ValuePiece = Date | null; // 🌟 Una fecha o ningún valor.
type Value = ValuePiece | [ValuePiece, ValuePiece]; // 🌟 Puede ser una fecha sola o un rango de fechas.

// 🛒 **FILTRO DE TRANSACCIONES**
export default function TransactionFilter() {
	// 🔑 **VARIABLES PRINCIPALES**
	const [date, setDate] = useState<Value>(new Date()); // 📅 Guardamos la fecha seleccionada en el calendario.
	const formattedDate = format(date?.toString() || new Date(), 'yyyy-MM-dd'); // ✏️ Cambiamos la fecha para que tenga el formato "AAAA-MM-DD".

	// 📡 **TRAER LOS DATOS**
	// 🔍 `useQuery` busca ventas de la fecha seleccionada.
	const { data, isLoading } = useQuery({
		queryKey: ['sales', formattedDate], // 🗝️ Identificador único para esta búsqueda.
		queryFn: () => getSalesByDate(formattedDate), // 🔄 Busca las ventas según la fecha.
	});

	// ➕ **CALCULAR EL TOTAL**
	// Suma los montos de todas las ventas del día. Si no hay ventas, el total es 0.
	const total = data?.reduce((total, transaction) => total + +transaction.total, 0) ?? 0;

	// 🖼️ **PRESENTACIÓN**
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10 relative items-start">
			{/* 📅 Sección del calendario */}
			<div className="lg:sticky lg:top-10">
				<Calendar value={date} onChange={setDate} locale="es" />
			</div>

			{/* 📋 Sección de las ventas */}
			<div>
				{/* 🌀 Si está cargando, mostramos un mensaje */}
				{isLoading && 'Cargando...'}

				{/* 🧾 Mostramos las ventas si hay datos */}
				{data ? (
					data.length ? (
						// 🛍️ Recorremos las ventas y las mostramos una a una.
						data.map((transaction) => (
							<TransactionSummary key={transaction.id} transaction={transaction} />
						))
					) : (
						// 🕳️ Si no hay ventas, mostramos este mensaje.
						<p className="text-lg text-center">No hay ventas en esta fecha</p>
					)
				) : null}

				{/* 💰 Mostramos el total de las ventas */}
				<p className="my-5 text-lg font-bold text-right">
					Total del día: {''}
					<span className="font-normal text-green-500">{formatPrice(total)}</span>
				</p>
			</div>
		</div>
	);
}
