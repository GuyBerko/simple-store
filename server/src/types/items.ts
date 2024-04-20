import mongoose from 'mongoose';

export interface ItemDoc extends mongoose.Document {
  title: string;
  limit: number;
}

export interface Item {
  title: string;
  limit: number;
  id: string;
}

export interface ItemModel extends mongoose.Model<ItemDoc> {}
