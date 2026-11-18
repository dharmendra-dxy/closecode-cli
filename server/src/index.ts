import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { toNodeHandler } from "better-auth/node";
import { auth } from './lib/auth';


const app = express();
const PORT = process.env.PORT;

// configure cors options:
const corsOption = {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}

app.all("/api/auth/*splat", toNodeHandler(auth))

app.use(cors(corsOption));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});