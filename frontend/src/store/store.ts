import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import newsReducer from "./features/News/newsSlice";
import movieReducer from "./features/Movie/MovieSlice";
import slotsReducer from "./features/Slots/SlotsSlice";
import authReducer from "./features/Authentication/authSlice";
import bookingReducer from "./features/Booking/bookingSlice";
import authApiReducer , { authApi } from "./features/Authentication/authApi";
import movieApiReducer,{ movieApi } from "./features/Movie/movieApi";
import { setupListeners } from "@reduxjs/toolkit/query";

// Persist Configurations
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "booking", "slots", "movie"], 
};


const rootReducer = combineReducers({
  news: newsReducer, // Non-persisted
  movie: movieReducer,
  slots: slotsReducer,
  auth: authReducer,
  booking: bookingReducer,
  [authApi.reducerPath] : authApiReducer,
  [movieApi.reducerPath] : movieApiReducer
});


const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware, movieApi.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
