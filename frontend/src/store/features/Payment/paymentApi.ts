import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { stripePayload } from "../../../types/stripePayload";

export const paymentApi = createApi({

    reducerPath : "paymentApi",
    baseQuery : fetchBaseQuery({
        baseUrl : "http://localhost:5000",
        credentials : "include"
    }),
    tagTypes: ['Payment'],
    endpoints : (builder) => ({
        createCheckoutSession : builder.mutation<{url : string , bookingId : string}, stripePayload >({
            query : (sessionData) => ({
                url : "/api/bookings/create",
                method : "POST",
                body : sessionData
            }),
            invalidatesTags : ['Payment'],
        }),

        getBookingStatus : builder.query<{message : string ,success:boolean}, {bookingId : string}>({
            query : ({bookingId}) => {

                const params = new URLSearchParams();

                if(bookingId) params.append("session_id" , bookingId)

               return  {
                url : `/api/bookings/status?${params.toString()}`,
                method : 'GET',}
            },
            providesTags : ['Payment'],
        })
    })

})

export const {useCreateCheckoutSessionMutation , useGetBookingStatusQuery} = paymentApi;
export default paymentApi.reducer;