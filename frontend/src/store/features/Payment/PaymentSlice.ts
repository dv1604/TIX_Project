import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { paymentApi } from "./paymentApi";

interface PaymentState {

    userId: number;
    movieId: number;
    theatreId: number;
    screenId: number;
    slotId: number;
    seatIds: number[];
    dayOffset: number;
    totalAmount: number;

}

const initialState: PaymentState = {

    userId: 0,
    movieId: 0,
    theatreId: 0,
    screenId: 0,
    slotId: 0,
    seatIds: [],
    dayOffset: 0,
    totalAmount: 0

}

export const PaymentSlice = createSlice({

    name: "payment",
    initialState,
    reducers: {
        setPaymentDetails: (state, action) => {
            return { ...state, ...action.payload };
        },
        setSeatId: (state, action: PayloadAction<number>) => {

            const seatId = action.payload;
            if (state.seatIds.includes(seatId)) {
                // If the seatId is already in the array, remove it
                state.seatIds = state.seatIds.filter(id => id !== seatId);
            } else {
                if (state.seatIds.length >= 5) {
                    state.seatIds = [...state.seatIds.slice(1), seatId];
                } else {
                    state.seatIds = [...state.seatIds, seatId];
                }
            }

        },
        setDayOffset: (state, action: PayloadAction<number>) => {
            state.dayOffset = action.payload;

        },
        setUserId: (state, action: PayloadAction<number>) => {
            state.userId = action.payload;
        },
        setTotalAmount: (state, action: PayloadAction<number>) => {
            state.totalAmount = action.payload;
        },
        resetPaymentDetails: (state) => {
            const userId = state.userId; // Keep current userId
            return {
                ...initialState,
                userId // override the reset with existing userId
            };
        }
    }

})

export const { setPaymentDetails, resetPaymentDetails, setSeatId, setUserId, setDayOffset, setTotalAmount } = PaymentSlice.actions;
export default PaymentSlice.reducer;