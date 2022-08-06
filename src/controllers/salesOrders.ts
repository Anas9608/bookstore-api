import { Request, Response } from 'express';
import Book from '../models/book';
import SalesOrder from '../models/salesOrder';
import { v4 as uuidv4 } from 'uuid';

export const createSalesOrder = async (req: Request, res: Response) => {
    try {
        //* Code goes here
        const transactionId = uuidv4();

        const salesOrder = req.body;
        let totalOrderAmount = 0;
        let itemsArray: any = [];
        const items = salesOrder.items;
        for (let i = 0; i < items.length; i++) {
            let itemObj: any = {};

            const doc = await Book.find(
                { isbn: items[i].isbn },
                { price: 1, _id: 1 }
            );
            itemObj.item = doc[0]._id;
            itemObj.quantity = items[i].quantity;
            itemObj.amount =
                items[i].quantity * parseFloat(doc[0].price.toString());
            itemsArray.push(itemObj);

            totalOrderAmount =
                totalOrderAmount +
                items[i].quantity * parseFloat(doc[0].price.toString());
        }
        console.log(itemsArray);

        await SalesOrder.create({
            transactionId,
            items: itemsArray,
            totalAmount: totalOrderAmount,
            userDetails: salesOrder.userDetails,
        });

        return res.status(201).json({
            message: 'Order placed successfully!',
            transactionId,
            totalOrderAmount,
        });
    } catch (error: any) {
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
};

export const getSalesOrders = async (req: Request, res: Response) => {
    const { transactionId } = req.query;
    const filter = transactionId ? { transactionId } : {};
    try {
        const salesOrders = await SalesOrder.find(filter, { _id: 0 });
        if (salesOrders.length === 0) {
            return res.status(404).send({
                message: 'No sales orders found!',
            });
        }
        return res.status(200).json({ salesOrders });
    } catch (error: any) {
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
};
