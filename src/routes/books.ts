import express, { Router } from 'express';
import * as book from '../controllers/books';

const bookRouter: Router = express.Router();

bookRouter.get('/', book.getBooks);

export default bookRouter;
