'use client';
import { CldImage } from 'next-cloudinary';
import { Ingredient } from '../../../util/types';

type Props = {
  ingredient: Ingredient;
};

export default function Images({ ingredient }: Props) {
  if (!ingredient.image) {
    return 'not found';
  }
  return (
    <div className="rounded-2xl overflow-hidden">
      <CldImage
        width="400"
        height="400"
        src={ingredient.image}
        sizes="100vw"
        alt={ingredient.name}
        className="w-full h-auto"
      />
    </div>
  );
}
