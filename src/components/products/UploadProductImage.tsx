'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadImageAction } from '../../../actions/upload-image-action';
import Image from 'next/image';
import { getImagePath } from '@/utils';

export default function UploadProductImage({ currentImage }: { currentImage?: string }) {
	const [image, setImage] = useState('');

	const onDrop = useCallback(async (acceptedFiles: File[]) => {
		const formData = new FormData();
		acceptedFiles.forEach((file) => {
			formData.append('file', file);
		});

		const imageUrl = await uploadImageAction(formData);
		setImage(imageUrl);
	}, []);

	const { getRootProps, getInputProps, isDragActive, isDragReject, isDragAccept } =
		useDropzone({
			accept: {
				'image/*': [
					'.jpeg',
					'.png',
					'.jpg',
					'.svg',
					'.webp',
					'.avif',
					'.gif',
					'.bmp',
					'.tiff',
					'.ico',
					'.heic',
					'.heif',
				],
				'video/*': ['.mp4', '.mov', '.avi', '.mkv'],
			},
			onDrop,
			maxFiles: 5,
		});

	return (
		<>
			<div className="space-y-1">
				<label className="block text-sm font-medium leading-6 text-gray-900">
					Imagen Producto
				</label>
				<div
					{...getRootProps({
						className: `
            py-20 border-2 border-dashed  text-center 
            ${
							isDragActive
								? 'border-gray-900 text-gray-900 bg-gray-200 '
								: 'border-gray-400 text-gray-400 bg-white'
						} 
            ${isDragReject ? 'border-none bg-white' : 'cursor-not-allowed'}
        `,
					})}
				>
					<input {...getInputProps()} />
					{isDragAccept && <p>Suelta la Imagen</p>}
					{isDragReject && <p>Archivo no válido</p>}
					{!isDragActive && <p>Arrastra y suelta una imagen aquí</p>}
				</div>
			</div>

			{image && (
				<div className="py-5 space-y-3">
					<p className="text-sm font-bold leading-6 text-gray-900">Imagen del producto</p>
					<div className="w-[300px] h-[320px] relative">
						<Image
							src={image}
							alt="Imagen Producto publicada"
							fill
							className="object-cover rounded-lg"
							priority
							sizes="300px 320px"
						/>
					</div>
				</div>
			)}

			{currentImage && !image && (
				<div className="py-5 space-y-3">
					<p className="text-sm font-bold leading-6 text-gray-900">Imagen Actual</p>
					<div className="w-[300px] h-[320px] relative">
						<Image
							src={getImagePath(currentImage)}
							alt="Imagen Producto publicada"
							fill
							className="object-cover rounded-lg"
							priority
							sizes="300px 320px"
						/>
					</div>
				</div>
			)}

			<input type="hidden" name="image" defaultValue={image ? image : currentImage} />
		</>
	);
}
