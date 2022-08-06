import { Schema, model } from 'mongoose';
import { getNumberFromDecimal128 } from './helpers/getters';

interface User {
    name: string;
    email: string;
    phone: string;
    address: string;
}
interface Item {
    item: Schema.Types.ObjectId;
    quantity: number;
    amount: Schema.Types.Decimal128;
}

interface SalesOrder {
    transactionId: string;
    items: Array<Item>;
    totalAmount: Schema.Types.Decimal128;
    userDetails: User;
}

const userSchema = new Schema<User>(
    {
        name: { type: String },
        email: { type: String },
        phone: { type: String },
        address: { type: String },
    },
    { _id: false }
);

const itemSchema = new Schema<Item>(
    {
        item: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Book',
        },
        quantity: { type: Number, required: true },
        amount: {
            type: Schema.Types.Decimal128,
            required: true,
            get: getNumberFromDecimal128,
        },
    },
    { _id: false, toJSON: { getters: true } }
);

const salesOrderSchema = new Schema<SalesOrder>(
    {
        transactionId: { type: String, required: true },
        items: [itemSchema],
        totalAmount: {
            type: Schema.Types.Decimal128,
            required: true,
            get: getNumberFromDecimal128,
        },
        userDetails: userSchema,
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: { getters: true, virtuals: false },
    }
);

const Purchase = model<SalesOrder>('Purchase', salesOrderSchema);
export default Purchase;
