import Stripe from 'stripe';
import { AppDataSource } from '../config/database';
import { Booking, PaymentStatus } from '../entities/Booking';
import { Request, Response } from 'express';
import { stripe } from '../config/stripe';
import { Seats, SeatStatus } from '../entities/Seats';

const bookingRepo = AppDataSource.getRepository(Booking);
const seatRepo = AppDataSource.getRepository(Seats);

export const stripeWebhook = async (req: Request, res: Response) => {

    console.log("✅ Stripe webhook triggered");

    const sig = req.headers['stripe-signature'] as string;

    let event: Stripe.Event;

    try {

        console.log("🔍 Raw Request Body (for verification)", req.body);
        console.log("🔍 Stripe Signature", sig);
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET as string
        );
    } catch (err) {

        console.log("Webhook signature verification failed.", err);
        res.status(400).send(`Webhook Error : ${err}`);
        return;

    }

    const eventType = event.type;
    const session = event.data.object as Stripe.Checkout.Session;

    console.log("📦 Event type: ", event.type);
    console.log("METADATA: ", session.metadata);


    const bookingId = session.metadata?.bookingId;

    if (!bookingId) {
        console.log("❌ Booking not found in DB");
        res.status(400).send("No booking Id provided");
        return;
    }

    console.log(bookingId);

    const booking = await bookingRepo.findOne({
        where: { id: bookingId },
        relations: ["seats"]
    });

    if (!booking) {
        res.status(404).send("No Booking found with this id");
        return;
    }

    if (event.type === "checkout.session.completed") {

        booking.payment_status = PaymentStatus.SUCCESS;
        booking.transactionId = session.payment_intent as string;

        if (booking.seats && booking.seats.length > 0) {
            for (const seat of booking.seats) {
                seat.status = SeatStatus.BOOKED;
                await seatRepo.save(seat);
                console.log("Seat Status Updated to Booked");
            }
        }

        await bookingRepo.save(booking);
        console.log("Payment  Successful . Booking & Seat updated");
    } else if (eventType === "payment_intent.payment_failed") {


        const intent = event.data.object as Stripe.PaymentIntent;
        const bookingId = intent.metadata?.bookingId;

        if (!bookingId) {
            res.status(400).send("No bookingId in metadata");
            return;
        }

        const booking = await bookingRepo.findOneBy({ id: bookingId });
        if (!booking) {
            res.status(404).send("Booking not found");
            return;
        }

        booking.payment_status = PaymentStatus.FAILED;
        booking.transactionId = intent.id;

        await bookingRepo.save(booking);
        console.log("❌ Payment failed. Booking updated.");


    }
    else if (eventType === "checkout.session.expired") {

        booking.payment_status = PaymentStatus.FAILED;
        booking.transactionId = session.payment_intent as string;
        await bookingRepo.save(booking);
        console.log("Payment expired. Booking marked as failed")

    } else {
        console.log(`Unhandled event type: ${event.type}`);
    }


    res.status(200).json({ recieved: true });

}