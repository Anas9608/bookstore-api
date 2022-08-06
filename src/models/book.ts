import { Schema, model } from 'mongoose';
import { getNumberFromDecimal128 } from './helpers/getters';

interface Book {
    title: string;
    isbn: string;
    pageCount: number;
    publishedDate: Date;
    authors: Array<string>;
    summary: string;
    price: Schema.Types.Decimal128;
}

const bookSchema = new Schema(
    {
        title: { type: String, required: true },
        authors: [{ type: String }],
        isbn: { type: String, required: true, unique: true },
        summary: { type: String },
        price: {
            type: Schema.Types.Decimal128,
            required: true,
            get: getNumberFromDecimal128,
        },
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: { getters: true, virtuals: false },
    }
);

const BookModel = model<Book>('Book', bookSchema);
export default BookModel;
