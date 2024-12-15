import { formatPrice } from '@/utils';

type AmountProps = {
	label: string;
	amount: number;
	discount?: boolean;
};

export default function Amount({ label, amount, discount }: AmountProps) {
	return (
		<div
			className={`${discount && 'text-green-900 bg-green-300'} flex justify-between p-1`}
		>
			<dd className="font-bold">{label}</dd>
			<dd className="text-gray-900">
				{discount && '-'}
				{formatPrice(amount)}
			</dd>
		</div>
	);
}
