import {Stripe} from 'stripe';

// initializing stripe using secret key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);