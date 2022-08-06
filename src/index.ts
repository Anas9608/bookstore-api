// External Modules
import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

dotenv.config();

// Internal Modules
import './config/mongoose';
import routes from './routes';

// App Variables
if (!process.env.PORT) {
    process.exit(1);
}
const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();

// App configuration
app.use(helmet());
app.use(cors());
app.use(express.json());

// App routes
app.use('/', routes);

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
