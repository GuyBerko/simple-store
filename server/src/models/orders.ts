import { model, Schema } from 'mongoose';
import { OrderDoc, OrderModel } from '../types/orders';

const OrderSchema = new Schema<OrderDoc, OrderModel>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  item: {
    type: Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  }
});

const Order = model<OrderDoc, OrderModel>('Order', OrderSchema);

export { Order };
