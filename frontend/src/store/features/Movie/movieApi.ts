import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authApi } from "../Authentication/authApi";
import { MovieResponse } from "../../../types/movieResponse";

interface movieData {

    id: number,
    title: string,
    genre: string,
    duration: string,
    rating: string,
    director: string,
    image: string

}

export const movieApi = createApi({
    reducerPath: "movieApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000",
        credentials: "include"
    }),
    endpoints: (builder) => ({

        getAllMovie: builder.query<movieData[], void>({
            query: () => ({
                url: "/api/movies",
                method: "GET"
            })
        }),

        MovieDetail: builder.mutation<MovieResponse, { movieId: number, city?: string, dayOffset?: number, chain?: string | null, screenName?: string | null }>({
            query: ({ movieId, city, dayOffset,chain,screenName }) => {
                const params = new URLSearchParams();

                if (city) params.append("city", city);
                if (dayOffset !== undefined) params.append("dayOffset", dayOffset.toString());
                if (chain) params.append("chain", chain);
                if (screenName) params.append("screenName", screenName);

                return {
                    url: `/api/movies/${movieId}?${params.toString()}`,
                    method: "GET"
                };
            }
        }),

        filterOptions: builder.mutation<{ screenNames: string[], chains: string[], cities: string[] }, {movieId : number,day? : number , city? : string| null}>({
            query: ({movieId,day,city}) => {

                const params = new URLSearchParams();

                if(day!== undefined) params.append("day" , day.toString());
                if(city) params.append("city",city)

            
               return {
                 url: `/api/filters/options/${movieId}?${params.toString()}`,
                method: "GET"}
            }
        }),

        




    })


})

export const { useGetAllMovieQuery, useMovieDetailMutation, useFilterOptionsMutation } = movieApi;
export default movieApi.reducer;