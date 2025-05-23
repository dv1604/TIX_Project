import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Booking State Interface
interface BookingState {
  bookingId :string | null;
  isSlotSelected: boolean;
  isSeatSelected: boolean;
  isPaymentDone: boolean;
}

// Initial State
const initialState: BookingState = {
  bookingId : null,
  isSlotSelected: false,
  isSeatSelected: false,
  isPaymentDone: false,
};

// Create Slice
const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    selectSlot: (state) => {
      console.log('here')
      state.isSlotSelected = true;
    },
    resetSlot: (state) => {
      state.isSlotSelected = false;
      state.isSeatSelected = false;
      state.isPaymentDone = false;
    },
    selectSeat: (state) => {
      state.isSeatSelected = true;
    },
    resetSeat: (state) => {
      state.isSeatSelected = false;
      state.isPaymentDone = false;
    },
    completePayment: (state) => {
      state.isPaymentDone = true;
    },
    resetPayment: (state) => {
      state.isPaymentDone = false;
    },
  },
});

// Export actions
export const {
  selectSlot,
  resetSlot,
  selectSeat,
  resetSeat,
  completePayment,
  resetPayment,
} = bookingSlice.actions;

// Export reducer
export default bookingSlice.reducer;
