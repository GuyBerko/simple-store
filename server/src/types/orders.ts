import mongoose from 'mongoose';
import { User } from './users';
import { Item } from './items';

export interface OrderDoc extends mongoose.Document {
  user: mongoose.PopulatedDoc<User>;
  item: mongoose.PopulatedDoc<Item>;
}

export interface Order {
  user: User;
  item: Item;
}

export interface OrderModel extends mongoose.Model<OrderDoc> {}
