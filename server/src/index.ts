import express from 'express';
import cors from 'cors';

import initializeCronJobs from './crons';
import connectDB from './db/mongodb';
import coinRoutes from './routes/coins';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/coins', coinRoutes);


const server = async () => {
    try {
        await connectDB();
        await initializeCronJobs();
        app.listen(5000, () => {
        console.log(`Server is running on port ${5000}`);
        });
    } catch (error) {
        console.log(error);
    }
}

server();