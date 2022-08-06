import { Request, Response } from 'express';
import { stringify } from 'qs';
import Book from '../models/book';

export const getBooks = async (req: Request, res: Response) => {
    try {
        //* Code goes here
        let { page, limit } = req.query;

        let pageNum = page as unknown as number;
        let limitNum = limit as unknown as number;

        page === undefined || pageNum <= 0 ? (pageNum = 1) : 0;
        limitNum === undefined ? (limitNum = 10) : 0;

        const books = await Book.find()
            .limit(limitNum)
            .skip((pageNum - 1) * limitNum);
        const totalPages = await Book.find().count();

        return res.status(200).json({
            currentPage: pageNum,
            totalPages,
            books,
        });
    } catch (error: any) {
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
};
