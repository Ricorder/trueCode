import { DeletePreviewPhotoType } from '@/src/shared';



export const handleBeforeUnload = (
	event: BeforeUnloadEvent,
	deleteUnderPhoto: DeletePreviewPhotoType,
	file: string,
) => {
	// Удаляем временный файл (запрос уйдёт, даже если страница закроется)
	if (file) {
		deleteUnderPhoto.mutate({ underPhoto: file });
	}
	// Современный способ: просто вернуть строку (в некоторых браузерах)
	event.preventDefault();
	event.returnValue = 'Вы уверены, что хотите уйти? Несохранённые данные будут потеряны.';
	return event.returnValue;
};