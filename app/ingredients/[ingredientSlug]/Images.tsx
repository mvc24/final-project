'use client';
import { CldImage } from 'next-cloudinary';
import { MainIngredientProps } from '../../../util/types';

export default function Images(props: MainIngredientProps) {
  const ingredient = props.props;
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
