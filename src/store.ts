//Antes de comentar
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Product, ShoppingCart, Coupon, CouponResponseSchema } from './schemas';

interface Store {
	total: number;
	discount: number;
	contents: ShoppingCart;
	coupon: Coupon;
	addToCart: (product: Product) => void;
	updateQuantity: (productId: Product['id'], quantity: number) => void;
	removeFromCart: (productId: Product['id']) => void;
	calculateTotal: () => void;
	applyCoupon: (couponName: string) => Promise<void>;
	applyDiscount: () => void;
	clearOrder: () => void;
}

const initialState = {
	total: 0,
	discount: 0,
	contents: [],
	coupon: {
		name: '',
		message: '',
		porcentaje: 0,
	},
	addToCart: () => {},
	updateQuantity: () => {},
	removeFromCart: () => {},
	calculateTotal: () => {},
	applyCoupon: async () => {},
	applyDiscount: () => {},
	clearOrder: () => {},
} as Store;

export const useStore = create<Store>()(
	devtools((set, get) => ({
		...initialState,
		addToCart: (product) => {
			const { id: productId, ...data } = product;
			let contents: ShoppingCart = [];
			const duplicated = get().contents.findIndex((item) => item.productId === productId);

			if (duplicated >= 0) {
				if (get().contents[duplicated].quantity >= get().contents[duplicated].inventory)
					return;

				contents = get().contents.map((item) =>
					item.productId === productId
						? {
								...item,
								quantity: item.quantity + 1,
						  }
						: item,
				);
			} else {
				contents = [
					...get().contents,
					{
						...data,
						quantity: 1,
						productId,
					},
				];
			}

			set(() => ({
				contents,
			}));
			get().calculateTotal();
		},
		updateQuantity: (productId, quantity) => {
			set((state) => ({
				contents: state.contents.map((item) =>
					item.productId === productId ? { ...item, quantity } : item,
				),
			}));
			get().calculateTotal();
		},
		removeFromCart: (productId) => {
			set((state) => ({
				contents: state.contents.filter((item) => item.productId !== productId),
			}));
			if (!get().contents.length) {
				get().clearOrder();
			}
			get().calculateTotal();
		},
		calculateTotal: () => {
			const total = get().contents.reduce(
				(total, item) => total + item.quantity * item.price,
				0,
			);
			set(() => ({
				total,
			}));
			if (get().coupon.porcentaje) {
				get().applyDiscount();
			}
		},
		applyCoupon: async (couponName) => {
			const req = await fetch(`/coupons/api`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					coupon_name: couponName,
				}),
			});
			const json = await req.json();
			const coupon = CouponResponseSchema.parse(json);
			set(() => ({
				coupon,
			}));
			if (get().coupon.porcentaje) {
				get().applyDiscount();
			}
		},
		applyDiscount: () => {
			const subtotalAmount = get().contents.reduce(
				(total, item) => total + item.quantity * item.price,
				0,
			);
			const discount = (get().coupon.porcentaje / 100) * subtotalAmount;
			const total = subtotalAmount - discount;
			set(() => ({
				discount,
				total,
			}));
		},
		clearOrder: () => {
			set(() => ({
				...initialState,
			}));
		},
	})),
);
