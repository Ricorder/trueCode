'use client'
import { forwardRef } from 'react';
import s from './Button.module.scss';
import { ButtonProps } from './Button.props';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
	children,
	variant = 'primary',
	size = 'medium',
	fullWidth = false,
	className = '',
	disabled = false,
	...props
}, ref) => {
	const classes = [
		s.button,
		s[variant],
		s[size],
		fullWidth && s.fullWidth,
		className,
		disabled && s.disabled
	]
		.filter(Boolean)
		.join(' ');
	return (
		<button
			ref={ref}
			className={classes}
			disabled={disabled}
			{...props}
		>
			{children}
		</button>
	);
});

Button.displayName = 'Button';