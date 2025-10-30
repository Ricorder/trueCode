import type { Dispatch, SetStateAction } from 'react';

export interface ProductFormProps {
	mode: 'create' | 'edit';
	name: string;
	setName: (name: string) => void;
	description: string;
	setDescription: (desc: string) => void;
	price: number;
	setPrice: (price: number) => void;
	priceDiscount: number;
	setPriceDiscount: (discount: number) => void;
	articleNumber: string;
	setArticleNumber: (article: string) => void;
	selectedUnderFile: File | string;
	setSelectedUnderFile: (file: File | string) => void;
	previewUrl: string;
	setPreviewUrl: Dispatch<SetStateAction<string>>;
	isSubmitting: boolean;
	onSubmit: (e: React.FormEvent) => void;
	initialUnderPhoto?: string;
}