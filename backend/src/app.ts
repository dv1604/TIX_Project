import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes'
import filterRoutes from './routes/filterRoutes';
import cityShowingRoutes from './routes/cityShowingRoutes';
import seatRoutes from './routes/seatRoutes';
import bookingRoutes from './routes/bookingRoutes';
import newsRoutes from './routes/newsRoutes';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload'
import { stripeWebhook } from './controllers/stripeWebhook';

dotenv.config();

export const app : Application = express();

app.use(cors({
    origin :"http://localhost:3000",
    methods : ['GET','POST','PUT','DELETE'],
    credentials : true,
}))
app.post('/api/bookings/webhook',express.raw({type : "application/json"}),stripeWebhook);

app.use(fileUpload());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); //for form-data

app.get('/',(req : Request , res : Response) => {
    res.send('hello from express')
})

app.use(authRoutes);
// extract movies and all related data
app.use('/api/movies',cityShowingRoutes);
// extract filter options
app.use('/api/filters',filterRoutes);
// extract seats according to slot
app.use('/api/seats',seatRoutes);
// payment Routes
app.use('/api/bookings',bookingRoutes)
// news Routes
app.use("/api/news",newsRoutes);