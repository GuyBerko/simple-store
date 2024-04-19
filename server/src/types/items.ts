import mongoose from 'mongoose';

interface ItemAttrs {
  title: string;
  limit: number;
}

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
