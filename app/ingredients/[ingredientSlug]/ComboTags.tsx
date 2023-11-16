import {
  getIngredientComboTags,
  getIngredientComboTagsById,
} from '../../../database/ingredientComboTags';
import { getTagTypes } from '../../../database/tags';
import { ComboTags } from '../../../util/types';

type ComboTag = {
  comboId: number;
  type: string;
  tagNames: string[];
};

type ComboTags = {
  comboId: number;
};

export default async function DisplayComboTags(props: ComboTags) {
  // const tagTypes = await getTagTypes();
  const allComboTags: ComboTag[] = await getIngredientComboTags();

  const comboTagsById: ComboTag[] = await getIngredientComboTagsById(
    props.comboId,
  );

  console.log('comboTagsById on combo display component: ', comboTagsById);

  const filteredTags = allComboTags.filter(
    (combo) => combo.comboId === props.comboId,
  );
  const groupedTags: { [key: string]: string[] } = {};
  filteredTags.forEach((tag) => {
    if (!groupedTags[tag.type]) {
      groupedTags[tag.type] = tag.tagNames;
    } else {
      groupedTags[tag.type]!.push(...tag.tagNames);
    }
  });

  return (
    <div>
      {Object.keys(groupedTags).map((type) => (
        <div key={`type-${type}`}>
          {type}: {groupedTags[type]!.join(', ')}
        </div>
      ))}
    </div>
  );
}
