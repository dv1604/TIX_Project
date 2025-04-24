import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { bookingResponse } from "../../../types/bookingResponse";

export const bookingApi = createApi({

    reducerPath : "bookingApi",
    baseQuery : fetchBaseQuery({
        baseUrl : "http://localhost:5000",
        credentials :"include"
    }),
    endpoints : (builder) => ({
        getBookingHistory : builder.query<bookingResponse[],void>({
            query : () => ({
                url : "/api/bookings",
                method : "GET"
            })
        })
    })

})

export const {useGetBookingHistoryQuery} = bookingApi;
export default bookingApi.reducer;