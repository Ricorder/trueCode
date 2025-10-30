import { ImageProps } from 'next/image';
import NextImage from 'next/image';

export const OptimizedImage = ({ src, ...props }: ImageProps) => {
	if (typeof src === 'string' && src.startsWith('http')) {
		// eslint-disable-next-line @next/next/no-img-element
		return <img src={src} loading="lazy" decoding="async" style={{ objectFit: 'cover' }} {...props} />;
	}
	return <NextImage src={src} {...props} priority />;
};
