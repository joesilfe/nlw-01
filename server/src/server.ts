import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import path from 'path';
import routes from './routes';
import { errors } from 'celebrate';

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(routes);

// Essa função serve para servir arquivos statico 
app.use('/uploads',
    express.static(path.resolve(__dirname, '..', 'uploads'))
);

app.use(errors());


app.listen(process.env.PORT);