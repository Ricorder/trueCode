import { Dispatch, SetStateAction } from 'react';

export interface PhotoProps {
	setPreviewUrl: Dispatch<SetStateAction<string>>;
	selectedUnderFile: File | string;
	setSelectedUnderFile: (file: File | string) => void;
	status?: boolean;
}