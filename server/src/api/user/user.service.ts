import { Order as OrderModel } from '../../models/orders';
import { User as UserModel } from '../../models/users';
import { Order as OrderInterface } from '../../types/orders';
import { User as UserInterface } from '../../types/users';

export const findUser = async (id: string): Promise<UserInterface | null> => {
  const user = await UserModel.findById(id);

  return user;
};

export const createUser = async (name: string): Promise<UserInterface> => {
  const user = await new UserModel({ name }).save();

  return { id: user._id, name: user.name };
};

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
