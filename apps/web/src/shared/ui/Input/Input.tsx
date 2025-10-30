'use client'
import { type InputHTMLAttributes, forwardRef } from 'react';
import s from './Input.module.scss';

// Input.tsx
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	fullWidth?: boolean;
	id: string; // ← обязательный пропс
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
	label,
	error,
	fullWidth = false,
	className = '',
	id, // ← используем напрямую
	...props
}, ref) => {
	const classes = [
		s.input,
		error && s.error,
		fullWidth && s.fullWidth,
		className
	].filter(Boolean).join(' ');

	return (
		<div className={s.wrapper}>
			{label && (
				<label htmlFor={id} className={s.label}> {/* ← стабильный id */}
					{label}
				</label>
			)}
			<input
				ref={ref}
				id={id}
				className={classes}
				{...props}
			/>
			{error && <span className={s.errorMessage}>{error}</span>}
		</div>
	);
});

Input.displayName = 'Input';