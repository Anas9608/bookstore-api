import BooksSeedData from '../constants/books';
import Book from '../models/book';

export const addBooks = async () => {
    try {
        if ((await Book.countDocuments()) > 0) {
            return;
        } else {
            await Book.insertMany(BooksSeedData);
            console.log('Books added');
        }
    } catch (error: any) {
        console.log(error.message);
    }
};
