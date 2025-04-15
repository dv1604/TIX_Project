import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes'
import filterRoutes from './routes/filterRoutes';
import cityShowingRoutes from './routes/cityShowingRoutes';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload'

dotenv.config();

export const app : Application = express();

app.use(cors({
    origin :"http://localhost:3000",
    methods : ['GET','POST','PUT','DELETE'],
    credentials : true,
}))
app.use(fileUpload());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); //for form-data

app.get('/',(req : Request , res : Response) => {
    res.send('hello from express')
})

app.use(authRoutes);
app.use('/movies',cityShowingRoutes);
app.use('/filters',filterRoutes);