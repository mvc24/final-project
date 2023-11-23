import { getIngredientComboTags } from '../../database/ingredientComboTags';
import { ComboTags } from '../../util/types';

export default async function DisplayComboTags(props: ComboTags) {
  // const tagTypes = await getTagTypes();
  const allComboTags = (await getIngredientComboTags()) as ComboTags[];

  const filteredTags = allComboTags.filter(
    (combo) => combo.comboId === props.comboId,
  );
  const groupedTags: { [key: string]: string[] } = {};
  filteredTags.forEach((tag) => {
    if (!groupedTags[tag.type]) {
      groupedTags[tag.type] = tag.tagNames ? [...tag.tagNames] : [];
    } else {
      tag.tagNames ? groupedTags[tag.type]?.push(...tag.tagNames) : [];
    }
  });
  // console.log('groupedTags: ', groupedTags);

  return (
    <div className="">
      {Object.keys(groupedTags).map((type, index) => (
        <span className="" key={`type-${type}`}>
          {index > 0 ? ' | ' : ''}
          {groupedTags[type]?.join(', ')}
        </span>
      ))}
    </div>
  );
}
