import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import {query} from './connection.js';
import clientRouter from './Routes/client.js';

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.use('/', clientRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});