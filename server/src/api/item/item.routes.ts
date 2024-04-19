import { Router } from 'express';
import { getAll } from './item.controller';

const routes = Router();

routes.get('/', getAll);

export default routes;
