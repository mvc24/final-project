'use client';
import { CldImage } from 'next-cloudinary';
import { Ingredient } from '../../util/types';

type Props = {
  ingredient: Ingredient;
};

export default function Images({ ingredient }: Props) {
  if (!ingredient.image) {
    return 'not found';
  }
  return (
    <div className="rounded-3xl overflow-hidden shadow-md">
      <CldImage
        width="1200"
        height="675"
        src={ingredient.image}
        sizes="100vw"
        alt={ingredient.name}
        className="w-full"
      />
    </div>
  );
}
