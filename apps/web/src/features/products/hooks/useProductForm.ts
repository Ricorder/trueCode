'use client'
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { trpcClient } from '@/src/shared';
import type { NewProduct, FullProduct } from '@/src/entities';
import { fullProduct, newProduct } from '@/src/entities';
import { imageToBase64 } from '../lib';

type FormMode = 'create' | 'edit';

interface UseProductFormProps {
  mode: FormMode;
  initialData?: FullProduct | null;
  previewUrl: string;
  setPreviewUrl: Dispatch<SetStateAction<string>>;
}

export const useProductForm = ({ mode, previewUrl, setPreviewUrl, initialData = null }: UseProductFormProps) => {
  const router = useRouter();
  const utils = trpcClient.useUtils();
  const deleteOldPhotoMutation = trpcClient.products.deleteUnderPhoto.useMutation();
  const createMutation = trpcClient.products.addProduct.useMutation({
    onSuccess: () => {
      utils.products.getAllProducts.invalidate();
      router.push('/products');
    },
  });
  const updateMutation = trpcClient.products.changeProduct.useMutation({
    onSuccess: () => {
      utils.products.getAllProducts.invalidate();
      utils.products.getProductById.invalidate();
      router.push('/products');
    },
  });
  const addFileMutation = trpcClient.products.addFile.useMutation()
  const [name, setName] = useState(initialData?.name ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [price, setPrice] = useState(initialData?.price ?? 0);
  const [priceDiscount, setPriceDiscount] = useState(initialData?.priceDiscount ?? 0);
  const [articleNumber, setArticleNumber] = useState(initialData?.articleNumber ?? '');
  const [selectedUnderFile, setSelectedUnderFile] = useState<File | string>('');

  useEffect(() => {
    if (initialData) {
      setName(initialData?.name ?? '');
      setDescription(initialData?.description ?? '');
      setPrice(initialData?.price ?? 0);
      setPriceDiscount(initialData?.priceDiscount ?? 0);
      setArticleNumber(initialData?.articleNumber ?? '');
    }
  }, [initialData]);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let finalUnderPhoto = previewUrl;
    if (selectedUnderFile instanceof File) {
      try {
        const payload = await imageToBase64(selectedUnderFile);
        const imageUrl = await addFileMutation.mutateAsync(payload);
        finalUnderPhoto = imageUrl;
      } catch (error) {
        console.error('Ошибка загрузки файла:', error);
        alert('Не удалось загрузить изображение');
        return;
      }
    }
    else if (selectedUnderFile) {
      finalUnderPhoto = selectedUnderFile;
    }
    const product = {
      id: initialData?.id,
      name,
      description,
      price,
      priceDiscount,
      articleNumber,
      underPhoto: finalUnderPhoto,
    };
    const schema = mode === 'create' ? newProduct : fullProduct;
    const result = schema.safeParse(product);
    if (!result.success) {
      const firstError = result.error.issues[0]?.message ?? 'Ошибка валидации';
      alert(firstError);
      return;
    }
    if (mode === 'edit' && initialData?.underPhoto && initialData.underPhoto) {
      deleteOldPhotoMutation.mutate({ underPhoto: initialData.underPhoto });
    }
    if (mode === 'create') {
      createMutation.mutate(product as NewProduct);
    } else {
      updateMutation.mutate(product as FullProduct);
    }
  };
  return {
    name,
    setName,
    description,
    setDescription,
    price,
    setPrice,
    priceDiscount,
    setPriceDiscount,
    articleNumber,
    setArticleNumber,
    selectedUnderFile,
    setSelectedUnderFile,
    previewUrl,
    setPreviewUrl,
    isSubmitting: createMutation.isPending || updateMutation.isPending,
    onSubmit,
  };
};