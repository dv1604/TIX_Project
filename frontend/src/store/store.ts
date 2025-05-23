import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import newsReducer from "./features/News/newsSlice";
import movieReducer from "./features/Movie/MovieSlice";
import slotsReducer from "./features/Slots/SlotsSlice";
import authReducer from "./features/Authentication/authSlice";
import paymentReducer from "./features/Payment/PaymentSlice";
import bookingReducer from "./features/Booking/bookingSlice";
import authApiReducer , { authApi } from "./features/Authentication/authApi";
import movieApiReducer,{ movieApi } from "./features/Movie/movieApi";
import seatApiReducer,{ seatApi } from "./features/Slots/SeatApi";
import bookingApiReducer,{ bookingApi } from "./features/Booking/bookingApi";
import paymentApiReducer,{ paymentApi } from "./features/Payment/paymentApi";
import newsApiReducer,{ newsApi } from "./features/News/newsApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { rtkMiddleware } from "./middleware/rtkMiddleware";

// Persist Configurations
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "booking", "slots", "movie","payment"], 
};


const rootReducer = combineReducers({
  news: newsReducer, // Non-persisted
  movie: movieReducer,
  slots: slotsReducer,
  auth: authReducer,
  booking: bookingReducer,
  payment : paymentReducer,
  [authApi.reducerPath] : authApiReducer,
  [movieApi.reducerPath] : movieApiReducer,
  [seatApi.reducerPath] : seatApiReducer,
  [paymentApi.reducerPath] : paymentApiReducer,
  [bookingApi.reducerPath] : bookingApiReducer,
  [newsApi.reducerPath] : newsApiReducer
});


const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      authApi.middleware, 
      movieApi.middleware, 
      seatApi.middleware , 
      paymentApi.middleware, 
      bookingApi.middleware, 
      newsApi.middleware,
      rtkMiddleware ),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
