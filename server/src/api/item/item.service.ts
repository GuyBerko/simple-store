import { Item as ItemModel } from '../../models/items';
import { Item as ItemInterface } from '../../types/items';

export const getAllItems = async (): Promise<ItemInterface[]> => {
  console.log('[getAll] - Starting fetching all items');
  const items = await ItemModel.find({});
  console.log(`[getAll] - finish fetching ${items.length} items`);
  return items.map(item => ({ title: item.title, limit: item.limit, id: item._id }));
};
