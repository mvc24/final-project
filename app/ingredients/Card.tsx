'use client';
import { CldImage } from 'next-cloudinary';
import { Ingredient } from '../../migrations/00003-createTableIngredients';
import { MainIngredientProps } from '../../util/types';

export default function Card(props: MainIngredientProps) {
  // console.log('props: ', props);
  console.log('props.props: ', props.props);
  const ingredient = props.props;
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <CldImage
          width="200"
          height="200"
          src={ingredient.image}
          sizes="100vw"
          crop="thumb"
          gravity="auto"
          alt="fennel"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {ingredient.name}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">Fashion</div>
          <div className="badge badge-outline">Products</div>
        </div>
      </div>
    </div>
  );
}
