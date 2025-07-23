import cors from 'cors';
import express from 'express';
import pino from 'pino-http';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import router from './routers/index.js';

import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';



const PORT = Number(process.env.PORT) || 3000;
dotenv.config();

export const startServer = () => { 
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(cookieParser());

    app.use(
        pino({
          transport: {
          target: 'pino-pretty',
          },
        }),
    );

    app.get('/', (req, res) => {
        res.status(200).json({ message: 'Welcome to MongoDB test' });
    });

    app.use(router);
    
    app.use('*', notFoundHandler);
    app.use(errorHandler);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

