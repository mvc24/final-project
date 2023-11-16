'use client';
import { CldImage } from 'next-cloudinary';
import { Ingredient } from '../../../util/types';

export default function Images({ ingredient }: Ingredient) {
  return (
    <CldImage
      width="1200"
      height="675"
      src={ingredient.image}
      sizes="100vw"
      crop="fill"
      gravity="auto"
      alt={ingredient.name}
    />
  );
}
