import { Request, Response } from 'express';
import * as itemService from './item.service';

export const getAll = async (req: Request, res: Response) => {
  try {
    const items = await itemService.getAllItems();
    res.send(items);
  } catch (err) {
    console.error('Error fetching all items', err);
    const status = err && typeof err === 'object' && 'status' in err ? Number(err.status) : 500;
    res.status(status).send('Server error');
  }
};
