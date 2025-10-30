'use client';
import { type ChangeEvent, useEffect, useRef, useState } from 'react';
import s from './Photo.module.scss';
import { PhotoProps } from './Photo.props';

export default function Photo({
	setPreviewUrl,
	selectedUnderFile,
	setSelectedUnderFile,
	status = false,
}: PhotoProps) {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const dropAreaRef = useRef<HTMLDivElement>(null);
	const [isDragging, setIsDragging] = useState(false);
	useEffect(() => {
		if (selectedUnderFile instanceof File) {
			const url = URL.createObjectURL(selectedUnderFile);
			setPreviewUrl(url);
			return () => URL.revokeObjectURL(url);
		} else if (typeof selectedUnderFile === 'string') {
			setPreviewUrl(selectedUnderFile || '/white.webp');
		}
	}, [selectedUnderFile, setPreviewUrl]);
	const handleFiles = (files: FileList | null) => {
		const file = files?.[0];
		if (file && file.type.startsWith('image/')) {
			setSelectedUnderFile(file);
		}
		if (fileInputRef.current) fileInputRef.current.value = '';
		setIsDragging(false);
	};
	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		handleFiles(event.target.files);
	};
	const triggerFilePicker = () => {
		fileInputRef.current?.click();
	};
	// Drag & Drop обработчики
	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (!isDragging) setIsDragging(true);
	};

	const handleDragLeave = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
		handleFiles(e.dataTransfer.files);
	};
	return (
		<div className={s.photo}>
			<div
				ref={dropAreaRef}
				className={`${s.dropArea} ${isDragging ? s.dragOver : ''}`}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
				onClick={triggerFilePicker}
				role="button"
				tabIndex={0}
				aria-label={status ? "Изменить фото. Кликните или перетащите изображение." : "Загрузить фото. Кликните или перетащите изображение."}
			>
				<span className={s.dropText}>
					{status ? 'Изменить фото' : 'Загрузить фото'}
				</span>
			</div>
			<input
				ref={fileInputRef}
				type="file"
				className={s.hidden}
				onChange={handleFileChange}
				accept="image/*"
				aria-hidden="true"
			/>
		</div>
	);
}