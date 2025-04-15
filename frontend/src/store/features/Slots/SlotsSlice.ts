import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface SlotsState {
    movieName: string;
    movieId:number;
    theatreName: string;
    city: string;
    slots: string[];
    theatreType: string;
    selectedTime: string;
    ticketPrice: number;
    totalAmount: number;
    selectedSeats?: string[];
}

const initialState: SlotsState = {
    movieName: '',
    movieId:0,
    theatreName: '',
    city: '',
    slots: [],
    theatreType: '',
    selectedTime: '',
    ticketPrice: 0,
    totalAmount: 0,
    selectedSeats: [],
};

const SlotsSlice = createSlice({
    name: "slots",
    initialState,
    reducers: {
        setSelectedShow: (
            state,
            action: PayloadAction<SlotsState>
        ) => {
            return { ...state, ...action.payload };
        },
        setMovieName: (state, action: PayloadAction<string>) => {
            state.movieName = action.payload;
        },

        setSelectedSeats: (state, action: PayloadAction<string[]>) => {
            state.selectedSeats = action.payload;
        },
        increaseTotalAmount: (state) => {
            state.totalAmount += state.ticketPrice;
        },
        decreaseTotalAmount: (state) => {
            state.totalAmount -= state.ticketPrice;
        },
        resetSlot: (state) => {
            return initialState;
          },
}});

export const slotsActions = SlotsSlice.actions;
export default SlotsSlice.reducer;
