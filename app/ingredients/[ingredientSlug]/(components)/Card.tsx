'use client';
import { CldImage } from 'next-cloudinary';
import { MainIngredientProps } from '../../../../util/types';

export default function Card(props: MainIngredientProps) {
  // console.log('props: ', props);
  console.log('props.props: ', props.props);
  const ingredient = props.props;
  return (
    <div className="card w-60 bg-base-100 shadow-xl text-center">
      <figure className="card image-full">
        <CldImage
          width="300"
          height="200"
          src={ingredient.image}
          sizes="100vw"
          crop="fill"
          gravity="auto"
          fillBackground
          alt={ingredient.name}
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-center text-xl">{ingredient.name}</h2>
      </div>
    </div>
  );
}
