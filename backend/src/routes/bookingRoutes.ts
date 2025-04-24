import express from 'express';
import { Router } from "express";
import { createCheckoutSession, getAllBookings, getBookingStatus } from "../controllers/bookingController";
import { stripeWebhook } from '../controllers/stripeWebhook';

const router = Router();

router.post('/create',createCheckoutSession);
router.get('/',getAllBookings);
router.get('/:bookingId', getBookingStatus);



export default router;