import express, { Router } from 'express';
import * as salesOrder from '../controllers/salesOrders';

const salesOrderRouter: Router = express.Router();

salesOrderRouter.post('/', salesOrder.createSalesOrder);
salesOrderRouter.get('/', salesOrder.getSalesOrders);

export default salesOrderRouter;
