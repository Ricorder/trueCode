export interface Resolve {
	base64: string;
	name: string;
}

export const imageToBase64 = (file: File): Promise<Resolve> => {
	return new Promise((resolve, reject) => {
		if (file.type.startsWith('image/')) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				if (typeof reader.result === 'string') {
					const base64 = reader.result.split(',')[1] ?? '';
					resolve({ base64, name: file.name });
				} else {
					reject(new Error('Ошибка при чтении файла'));
				}
			};
			reader.onerror = (error) => reject(error);
		} else {
			reject(new Error('Файл не является изображением'));
		}
	});
};