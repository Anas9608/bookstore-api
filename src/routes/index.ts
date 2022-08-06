import express, { Router } from 'express';
import { getSalesOrders } from '../controllers/salesOrders';
// Import other route files here
import bookRouter from './books';
import salesOrderRouter from './salesOrders';

const router: Router = express.Router();
// Define route here
router.use('/book', bookRouter);
router.use('/sales-order', salesOrderRouter);
router.use('/get-sales-order', getSalesOrders);

export default router;
