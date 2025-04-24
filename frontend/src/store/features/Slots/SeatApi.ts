import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Seat } from "../../../types/Seats";



export const seatApi = createApi({
    reducerPath : "seatApi",
    baseQuery : fetchBaseQuery({
        baseUrl : "http://localhost:5000",
        credentials : "include"
    }),
    endpoints:(builder) => ({
        getSeats : builder.query<Seat[],number>({
            query : (slotId ) => ({
                url : `/api/seats/${slotId}`,
                method : "GET"
            })
        })  
    })
})

export const {useGetSeatsQuery} = seatApi;

export default seatApi.reducer;