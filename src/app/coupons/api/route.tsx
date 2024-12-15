export async function POST(request: Request) {
	const couponName = await request.json();
	const url = `${process.env.API_URL}/coupons/apply-coupon`;
	const req = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
		body: JSON.stringify(couponName),
	});
	const response = await req.json();

	return Response.json({ ...response, status: req.status });
}
