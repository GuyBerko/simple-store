import { Request, Response } from 'express';
import * as userService from './user.service';
import { sendMessage } from '../../web-socket';

export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const userOrders = await userService.getUserOrders(id);

    res.send(userOrders);
  } catch (err) {
    console.error('Error getting user data', err);
    const status = err && typeof err === 'object' && 'status' in err ? Number(err.status) : 500;
    res.status(status).send('Server error');
  }
};

export const setUserOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { itemId } = req.body;

    if (!itemId) {
      return res.status(400).send('Bad Request');
    }

    await userService.setUserOrder(id, itemId);

    sendMessage(id, JSON.stringify({ event: 'purchased' }));

    res.status(201).send('Ok');
  } catch (err) {
    console.error('Error placing new order for user', err);
    const status = err && typeof err === 'object' && 'status' in err ? Number(err.status) : 500;
    res.status(status).send('Server error');
  }
};
