import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { newsResponse } from "../../../types/newsResponse";

export const newsApi = createApi({

    reducerPath: "newsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000",
        credentials: "include"
    }),
    endpoints: (builder) => ({
        getFilteredNews: builder.mutation<newsResponse[]
            , { category?: string, keyword?: string }>({

                query: ({ category, keyword }) => {

                    const params = new URLSearchParams();

                    if (category) params.append("category", category);
                    if (keyword) params.append("keyword", keyword);

                    return {
                        url: `/api/news?${params.toString()}`,
                        method: "GET"
                    }

                }
            }),
        getKeywords: builder.mutation<{ keyword_id: number, keyword_name: string }[]
            , { category?: string }>({

                query: ({ category }) => {

                    const params = new URLSearchParams();

                    if (category) params.append("category", category);

                    return {
                        url: `/api/news/keywords?${params.toString()}`,
                        method: "GET"
                    }

                }
            }),
        getNewsById : builder.query<newsResponse,{newsId:number}>({
            query : ({newsId})=> ({
                url : `/api/news/${newsId}`,
                method :"GET"
            })
        }),

        getAllNews: builder.query<newsResponse[], void>({
            query: () => ({
                url: "/api/news/all",
                method: "GET"
            })
        }),
    })

})

export const { useGetFilteredNewsMutation, useGetKeywordsMutation ,useGetNewsByIdQuery  , useGetAllNewsQuery} = newsApi;
export default newsApi.reducer;