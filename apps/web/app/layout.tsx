import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.scss';
import { ThemeProvider } from 'next-themes';
import { TRPCProvider } from '@/src/shared';
import { ReactNode } from 'react';

const geistSans = localFont({
	src: '../app/fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});
const geistMono = localFont({
	src: '../app/fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});
export const metadata: Metadata = {
	title: 'True Code',
	description: 'Test app',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="ru" suppressHydrationWarning>
			<body style={{ minWidth: '400px' }} className={`${geistSans.variable} ${geistMono.variable}`}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					<TRPCProvider>
						{children}
					</TRPCProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
