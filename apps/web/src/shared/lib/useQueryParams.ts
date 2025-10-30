'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const useQueryParams = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const getParam = <T extends string>(key: string, defaultValue: T): T => {
		return (searchParams.get(key) as T) || defaultValue;
	};
	const updateQuery = useCallback((updates: Record<string, string | number | null>) => {
			const newParams = new URLSearchParams(searchParams.toString());
			Object.entries(updates).forEach(([key, value]) => {
				if (value == null || value === '') {
					newParams.delete(key);
				} else {
					newParams.set(key, String(value));
				}
			});
			const queryString = newParams.toString();
			const url = queryString ? `${pathname}?${queryString}` : pathname;
			router.replace(url, { scroll: false });
		},
		[router, pathname, searchParams]
	);
	return {
		searchParams,
		updateQuery,
		getParam,
	};
};