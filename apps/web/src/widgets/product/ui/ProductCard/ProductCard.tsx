'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDeleteProduct } from '@/src/features';
import DeleteIcon from './DeleteIcon';
import s from './ProductCard.module.scss';
import { ProductCardProps } from './ProductCard.props';
import { motion } from 'framer-motion';
import { OptimizedImage } from '@/src/shared';

export const ProductCard = ({ product }: ProductCardProps) => {
	const router = useRouter();
	const deleteProduct = useDeleteProduct();
	const [isDeleting, setIsDeleting] = useState(false);
	const goToEdit = () => {
		if (!isDeleting) {
			router.push(`/product/${product.id}`);
		}
	};
	const handleDelete = async () => {
		if (confirm('Вы уверены, что хотите удалить продукт?')) {
			setIsDeleting(true);
			try {
				await deleteProduct.mutateAsync({
					id: product.id,
					underPhoto: product.underPhoto
				});
			} catch (error) {
				console.error('Ошибка удаления:', error);
				setIsDeleting(false);
			}
		}
	};
	console.log('product.underPhoto', product.underPhoto);
	
	return (
		<motion.div
			layout
			initial={{ opacity: 1, y: 0 }}
			animate={isDeleting ? { opacity: 0, height: 0, marginBottom: 0, y: -20 } : {}}
			transition={{ duration: 0.3 }}
			className={s.productCard}
		>
			<div className={s.imageCell} onClick={goToEdit}>
				<OptimizedImage src={product.underPhoto} width={80} height={80} alt={product.name} className={s.productImage} />
			</div>
			<div>{product.name}</div>
			<div className={s.hideOnTablet}>{product.description}</div>
			<div className={s.hideOnMobile}>{product.price} руб</div>
			<div>{product.priceDiscount} руб</div>
			<div className={s.hideOnTablet}>{product.articleNumber}</div>
			<button className={s.deleteButton} onClick={handleDelete} aria-label="Удалить продукт">
				<DeleteIcon size={20} />
			</button>
		</motion.div>
	);
};