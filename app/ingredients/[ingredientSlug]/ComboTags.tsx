import { getIngredientComboTags } from '../../../database/ingredientComboTags';
import { ComboTags } from '../../../util/types';

type ComboTag = {
  comboId: number;
  type: string;
  tagNames: string[];
};

export default async function DisplayComboTags(props: ComboTags) {
  // const tagTypes = await getTagTypes();
  const allComboTags: ComboTag[] = await getIngredientComboTags();

  const filteredTags = allComboTags.filter(
    (combo) => combo.comboId === props.comboId,
  );
  const groupedTags: { [key: string]: string[] } = {};
  filteredTags.forEach((tag) => {
    if (!groupedTags[tag.type]) {
      groupedTags[tag.type] = [...tag.tagNames];
    } else {
      groupedTags[tag.type]?.push(...tag.tagNames);
    }
  });
  console.log('groupedTags: ', groupedTags);

  return (
    <div>
      {Object.keys(groupedTags).map((type, index) => (
        <span key={`type-${type}`}>
          {index > 0 ? ' | ' : ''}
          {groupedTags[type]?.join(', ')}
        </span>
      ))}
    </div>
  );
}
