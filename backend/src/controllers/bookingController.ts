import { Request, Response } from "express";
import { stripe } from "../config/stripe";
import { AppDataSource } from "../config/database";
import { Booking, PaymentStatus } from "../entities/Booking";
import { Users } from "../entities/Users";
import { Movies } from "../entities/Movies";
import { Screens } from "../entities/Screens";
import { Theatre } from "../entities/Theatre";
import { Slot } from "../entities/Slot";
import { Seats } from "../entities/Seats";
import { formattedDate } from "../utitlity/formattedDate";
import { v4 as uuidv4 } from 'uuid';
import { Not } from "typeorm";


const bookingRepo = AppDataSource.getRepository(Booking);
const userRepo = AppDataSource.getRepository(Users);
const movieRepo = AppDataSource.getRepository(Movies);
const screenRepo = AppDataSource.getRepository(Screens);
const theatreRepo = AppDataSource.getRepository(Theatre);
const slotRepo = AppDataSource.getRepository(Slot);
const seatRepo = AppDataSource.getRepository(Seats);


export const createCheckoutSession = async (req: Request, res: Response) => {

    try {

        console.log("Received body: ", req.body);

        const { userId, movieId, theatreId, screenId, slotId, seatIds, dayOffset, totalAmount } = req.body;

        console.log(userId,movieId,theatreId,screenId,slotId,seatIds,dayOffset,totalAmount)

        const [user, movie, theatre, screen, slot] = await Promise.all([
            userRepo.findOneBy({ id: userId }),
            movieRepo.findOneBy({ id: movieId }),
            theatreRepo.findOneBy({ id: theatreId }),
            screenRepo.findOneBy({ id: screenId }),
            slotRepo.findOneBy({ id: slotId })
        ])

        if (!user || !movie || !theatre || !screen || !slot) {
            res.status(404).json({ message: "Invalid references" });
            return;
        }

        const seats = await seatRepo.find({
            where: seatIds.map((id: number) => ({ id })),
        });

        const bookingId = uuidv4();
        const bookedDate = formattedDate(dayOffset);

        // save booking details regradless of payment status
        const booking = bookingRepo.create({
            id: bookingId,
            user,
            movie,
            theatre,
            screen,
            slot,
            seats,
            booking_date: `${bookedDate.date} ${bookedDate.month}`,
            booking_day: bookedDate.day,
            booking_year: bookedDate.year,
            movie_title: movie.title,
            movie_poster: movie.image,
            theatre_name: theatre.name,
            theatre_location: theatre.location,
            theatre_chain: theatre.chain,
            screen_name: screen.name,
            slot_time: slot.time,
            ticket_price: screen.price,
            total_amount : totalAmount,
            payment_status: PaymentStatus.PENDING
        });

        await bookingRepo.save(booking);

        // stripe session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            customer_email: user.email,
            billing_address_collection: 'required', // This line is important
            payment_intent_data: {
                metadata: {
                  bookingId: booking.id,
                }
              },
            metadata: {
                bookingId,
            },
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: movie.title,
                            images: [movie.image],
                        },
                        unit_amount: totalAmount * 100, //in paise as stripe accepts amounts in smallest unit of currency
                    },
                    quantity: 1
                }
            ],
            success_url: `${process.env.CLIENT_URL}/payment-confirmation`,
            cancel_url: `${process.env.CLIENT_URL}/my-tickets/transaction-list`
        });

        res.status(200).json({ url: session.url });

    } catch (err) {

        console.log("ERROR RECIEVED WHILE CONNECTING WITH STRIPE: ", err);
        res.status(500).json({ message: "Payment Initiation Failed" });
        return;

    }

}

export const getBookingStatus = async(req : Request, res : Response) => {

    const {bookingId} = req.params;

    const bookingFound = await bookingRepo.findOne({
        where : {
            id : bookingId
        }
    })

    if(!bookingFound){
        res.status(404).json({message : "Booking for this Id not found"});
        return;
    }

    const status = bookingFound.payment_status;

    res.status(200).json({status});
    return;

};

export const getAllBookings = async(req : Request , res : Response) => {

    try{

        const bookings = await bookingRepo.find({
            where:{ payment_status : Not(PaymentStatus.PENDING)},
            order : {
                createdAt : 'DESC'
            }
        });

        res.status(200).json(bookings);
        return;

    }catch(err){

        res.status(500).json({
            messae : "Error fetchingBookings"
        })
        return;
    }

}