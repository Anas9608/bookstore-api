import { connect } from 'mongoose';
import { addBooks } from '../utils/seed';

if (!process.env.PORT) {
    process.exit(1);
}
const database = connect(process.env.MONGO_DB as string)
    .then(() => {
        console.log('Connected to MongoDB');
        addBooks();
    })
    .catch((error) => {
        console.log('MongoDB not connected', error.message);
    });

export default database;
