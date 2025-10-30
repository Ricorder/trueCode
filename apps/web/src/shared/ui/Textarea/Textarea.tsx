'use client'
import { type TextareaHTMLAttributes, forwardRef } from 'react';
import s from './Textarea.module.scss';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	error?: string;
	fullWidth?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
	label,
	error,
	fullWidth = false,
	className = '',
	id,
	...props
}, ref) => {
	const inputId = id || (label ? `textarea-${Math.random().toString(36).substr(2, 9)}` : undefined);
	const classes = [
		s.textarea,
		error && s.error,
		fullWidth && s.fullWidth,
		className
	].filter(Boolean).join(' ');

	return (
		<div className={s.wrapper}>
			{label && (
				<label htmlFor={inputId} className={s.label}>
					{label}
				</label>
			)}
			<textarea
				ref={ref}
				id={inputId}
				className={classes}
				{...props}
				cols={45}
			/>
			{error && <span className={s.errorMessage}>{error}</span>}
		</div>
	);
});

Textarea.displayName = 'Textarea';