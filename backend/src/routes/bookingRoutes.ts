import express from 'express';
import { Router } from "express";
import { createCheckoutSession, getAllBookings, getBookingStatus } from "../controllers/bookingController";
import { stripeWebhook } from '../controllers/stripeWebhook';
import { verifyCheckoutSession } from '../controllers/verificationController';

const router = Router();

router.post('/create',createCheckoutSession);
router.get('/',getAllBookings);
router.get('/status', verifyCheckoutSession);



export default router;