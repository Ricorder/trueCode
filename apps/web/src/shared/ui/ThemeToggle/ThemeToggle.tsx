'use client'
import s from './ThemeToggle.module.scss';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();
	useEffect(() => {
		setMounted(true);
	}, []);
	if (!mounted) return null;
	return (
		<button
			className={s.theme} 
			onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
			aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
		>
			{theme === 'dark' ? '☀️' : '🌙'}
		</button>
	);
};