import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { stripePayload } from "../../../types/stripePayload";

export const paymentApi = createApi({

    reducerPath : "paymentApi",
    baseQuery : fetchBaseQuery({
        baseUrl : "http://localhost:5000",
        credentials : "include"
    }),
    endpoints : (builder) => ({
        createCheckoutSession : builder.mutation<{url : string}, stripePayload >({
            query : (sessionData) => ({
                url : "/api/bookings/create",
                method : "POST",
                body : sessionData
            })
        })
    })

})

export const {useCreateCheckoutSessionMutation} = paymentApi;
export default paymentApi.reducer;