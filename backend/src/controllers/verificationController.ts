import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Booking, PaymentStatus } from "../entities/Booking";
import { stripe } from "../config/stripe";

const bookingRepo = AppDataSource.getRepository(Booking);

export const verifyCheckoutSession = async (req: Request, res: Response) => {

    try {
        const  session_id  = req.query.session_id as string;

        if (!session_id) {
            res.status(400).json({ message: 'Session ID is required ' ,success : false});
            return;
        }

        console.log(session_id)

        const session = await stripe.checkout.sessions.retrieve(session_id as string);
        console.log("session",session)

        const bookingId = session.metadata?.bookingId;
        console.log("session id" , session_id);
        console.log("bookinId",bookingId)

        if (!bookingId) {
            res.status(400).json({ message: 'Booking ID not found' , success : false});
            return;
        }

        const booking = await bookingRepo.findOneBy({ id: bookingId });

        console.log(booking)
        if (!booking) {
            res.status(404).json({ message: "Booking not found", success : false });
            return;
        }

        if (session.payment_status === 'paid' && booking.payment_status === PaymentStatus.SUCCESS) {
            res.status(200).json({ message: "Payment Confirmed" ,success : true})
            return;
        } else {
            res.status(400).json({ message: "Payment not completed",success : false })
            return;

        }
    } catch (error) {

        res.status(500).json({ message: "Internal Server Error", success : false});
        return;
    }

}