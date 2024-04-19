import { Router } from 'express';
import { getUserOrders, setUserOrder } from './user.controller';

const routes = Router();

routes.get('/:id/orders', getUserOrders);
routes.post('/:id/order', setUserOrder);

export default routes;
