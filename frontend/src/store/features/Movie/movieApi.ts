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
    reducerPath: "movieAuth",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000",
        credentials: "include"
    }),
    endpoints: (builder) => ({

        getAllMovie: builder.query<movieData[], void>({
            query: () => ({
                url: "/movies",
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
                    url: `/movies/${movieId}?${params.toString()}`,
                    method: "GET"
                };
            }
        }),

        filterOptions: builder.query<{ screenNames: string[], chains: string[], cities: string[] }, void>({
            query: () => ({
                url: "/filters/options",
                method: "GET"
            })
        })


    })


})

export const { useGetAllMovieQuery, useMovieDetailMutation, useFilterOptionsQuery } = movieApi;
export default movieApi.reducer;