import { type ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary' | 'danger';
	size?: 'small' | 'medium' | 'large';
	fullWidth?: boolean;
}