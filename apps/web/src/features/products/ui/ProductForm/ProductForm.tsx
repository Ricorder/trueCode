'use client';
import { useEffect } from 'react';
import { Button, Input, OptimizedImage, Textarea } from '@/src/shared';
import Photo from '../Photo/Photo';
import s from './ProductForm.module.scss';
import { ProductFormProps } from './ProductForm.props';

export const ProductForm = ({
	mode,
	name,
	setName,
	description,
	setDescription,
	price,
	setPrice,
	priceDiscount,
	setPriceDiscount,
	articleNumber,
	setArticleNumber,
	selectedUnderFile,
	setSelectedUnderFile,
	previewUrl,
	setPreviewUrl,
	isSubmitting,
	onSubmit,
	initialUnderPhoto = '',
}: ProductFormProps) => {
	const imageUrl = initialUnderPhoto || '/square.jpg';
	useEffect(() => {
			setPreviewUrl(imageUrl);
	}, [imageUrl, setPreviewUrl]);
	return (
		<form onSubmit={onSubmit} className={s.form}>
			<OptimizedImage src={previewUrl} width={500} height={500} alt={name} className={s.image} />
			<Photo setPreviewUrl={setPreviewUrl} selectedUnderFile={selectedUnderFile} setSelectedUnderFile={setSelectedUnderFile} status={mode === 'edit'} />
			<div className={s.inputs}>
				<Input id="product-name" label="Название" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required fullWidth />
				<Input id="product-discount" label="Цена со скидкой" name="discount" type="number" value={priceDiscount} onChange={(e) => setPriceDiscount(Number(e.target.value))} required fullWidth />
				<Input id="product-price" label="Цена" name="price" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} required fullWidth />
				<Textarea id="product-description" label="Описание" name="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} fullWidth />
				<Input id="product-articleNumber" label="Артикул" name="articleNumber" type="text" value={articleNumber} onChange={(e) => setArticleNumber(e.target.value)} required fullWidth />
				<Button type="submit" disabled={isSubmitting} variant="primary" size="medium">
					{isSubmitting
						? 'Сохранение...'
						: mode === 'create'
							? 'Создать продукт'
							: 'Сохранить изменения'}
				</Button>
			</div>
		</form>
	);
};
