import { Item as ItemModel } from '../../models/items';
import { Order as OrderModel } from '../../models/orders';
import { User as UserModel } from '../../models/users';
import { User as UserInterface } from '../../types/users';

export const findUser = async (id: string): Promise<UserInterface | null> => {
  // getting the user into a variable instead of just returning the promise for easier debugging
  const user = await UserModel.findById(id);

  return user;
};

export const createUser = async (name: string): Promise<UserInterface> => {
  const user = await new UserModel({ name }).save();

  return { id: user._id, name: user.name };
};

/**
 * return object with key item id and value number of items user has purchased
 */
export const getUserOrders = async (id: string) => {
  const orders = await OrderModel.find({ user: id }).populate('item');

  return orders.reduce<{ [id: string]: number }>((acc, curr) => {
    if (!curr.item?.id) return acc;

    const key = `${curr.item.id}`;
    acc[key] = (acc[key] || 0) + 1;

    return acc;
  }, {});
};

export const setUserOrder = async (userId: string, itemId: string) => {
  const order = new OrderModel({ user: userId, item: itemId });

  await order.save();
};

export const getItemRemainingLimit = async (userId: string, itemId: string) => {
  const [orders, item] = await Promise.all([OrderModel.find({ user: userId, item: itemId }), ItemModel.findById(itemId)]);
  
  if (!item?.limit){
    console.debug('[getItemRemainingLimit] - item limit is undefined', item);
    return 0;
  }

  const numberOfOrders = orders.length;

  return item?.limit - numberOfOrders;
}