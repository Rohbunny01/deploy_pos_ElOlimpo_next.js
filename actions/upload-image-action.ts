'use server';

export async function uploadImageAction(formData: FormData): Promise<string> {
	const url = `${process.env.API_URL}/products/upload-image`;
	const response = await fetch(url, {
		method: 'POST',
		body: formData,
	});

	const image = await response.json();

	return image.secure_url;
}
