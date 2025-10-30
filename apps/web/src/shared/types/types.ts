import { TRPCClientErrorLike } from '@trpc/client';
import { UseTRPCMutationResult, UseTRPCQueryResult } from '@trpc/react-query/shared';
import { DefaultErrorShape } from '@trpc/server/unstable-core-do-not-import';

export type DeleteProductType = UseTRPCMutationResult<string, TRPCClientErrorLike<{
	input: {
		id: string;
		underPhoto: string;
	};
	output: string;
	transformer: false;
	errorShape: DefaultErrorShape;
}>, {
	id: string;
	underPhoto: string;
}, unknown>

export type AddProductType = UseTRPCMutationResult<{
	id: string;
	name: string;
	description: string;
	price: number;
	priceDiscount: number;
	articleNumber: string;
	underPhoto: string;
}, TRPCClientErrorLike<{
	input: {
		name: string;
		description: string;
		price: number;
		priceDiscount: number;
		articleNumber: string;
		underPhoto: string;
	};
	output: {
		id: string;
		name: string;
		description: string;
		price: number;
		priceDiscount: number;
		articleNumber: string;
		underPhoto: string;
	};
	transformer: false;
	errorShape: DefaultErrorShape;
}>, {
	name: string;
	description: string;
	price: number;
	priceDiscount: number;
	articleNumber: string;
	underPhoto: string;
}, unknown>

export type GetProductType = UseTRPCQueryResult<{
	id: string;
	name: string;
	description: string;
	price: number;
	priceDiscount: number;
	articleNumber: string;
	underPhoto: string;
}, TRPCClientErrorLike<{
	input: {
		id: string;
	};
	output: {
		id: string;
		name: string;
		description: string;
		price: number;
		priceDiscount: number;
		articleNumber: string;
		underPhoto: string;
	};
	transformer: false;
	errorShape: DefaultErrorShape;
}>>

export type GetProductTypes = UseTRPCQueryResult<{
	items: {
		id: string;
		name: string;
		description: string;
		price: number;
		priceDiscount: number;
		articleNumber: string;
		underPhoto: string;
	}[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}, TRPCClientErrorLike<{
	input: {
		page?: number | undefined;
		limit?: number | undefined;
	};
	output: {
		items: {
			id: string;
			name: string;
			description: string;
			price: number;
			priceDiscount: number;
			articleNumber: string;
			underPhoto: string;
		}[];
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
	transformer: false;
	errorShape: DefaultErrorShape;
}>>

export type ChangeProductType = UseTRPCMutationResult<{
	id: string;
	name: string;
	description: string;
	price: number;
	priceDiscount: number;
	articleNumber: string;
	underPhoto: string;
}, TRPCClientErrorLike<{
	input: {
		id: string;
		name: string;
		description: string;
		price: number;
		priceDiscount: number;
		articleNumber: string;
		underPhoto: string;
	};
	output: {
		id: string;
		name: string;
		description: string;
		price: number;
		priceDiscount: number;
		articleNumber: string;
		underPhoto: string;
	};
	transformer: false;
	errorShape: DefaultErrorShape;
}>, {
	id: string;
	name: string;
	description: string;
	price: number;
	priceDiscount: number;
	articleNumber: string;
	underPhoto: string;
}, unknown>

export type FileType = UseTRPCMutationResult<string, TRPCClientErrorLike<{
	input: {
		base64: string;
		name: string;
	};
	output: string;
	transformer: false;
	errorShape: DefaultErrorShape;
}>, {
	base64: string;
	name: string;
}, unknown>

export type DeletePreviewPhotoType = UseTRPCMutationResult<string, TRPCClientErrorLike<{
	input: {
		underPhoto: string;
	};
	output: string;
	transformer: false;
	errorShape: DefaultErrorShape;
}>, {
	underPhoto: string;
}, unknown>