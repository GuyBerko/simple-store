import { model, Schema } from 'mongoose';
import { ItemDoc, ItemModel } from '../types/items';

const ItemSchema = new Schema<ItemDoc, ItemModel>({
  title: {
    type: String,
    required: true,
  },
  limit: {
    type: Number,
    default: 0,
  },
});

const Item = model<ItemDoc, ItemModel>('Item', ItemSchema);

export { Item };
