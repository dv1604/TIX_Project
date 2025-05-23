import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000",
        credentials: "include"
    }),
    tagTypes : ["Auth"],
    endpoints: (builder) => ({
        signUp: builder.mutation<
            { message?: string } |
            {
                email?: string,
                phoneNumber?: string,
                password?: string
            }
            , {
                name: string,
                email: string,
                phoneNumber: string,
                password: string
            }>
            ({
                query: (userData) => ({
                    url: "/signup",
                    method: "POST",
                    body: userData,
                }),
                invalidatesTags:["Auth"]
            }),

        login: builder.mutation<
            { message?: string, name?: string } |
            { error: string },
            { phoneNumber: string; password: string }>({
                query: (loginData) => ({
                    url: "/login",
                    method: "POST",
                    body: loginData,
                }),
                invalidatesTags:["Auth"]
            }),

            logout:builder.mutation<{message:string},void>({
                query:() =>({
                    url:'/logout',
                    method:'GET'
                }),
                invalidatesTags:["Auth"]
            }),

        checkAuth : builder.query<{isAuthenticated : boolean,id : number , name : string},void>({
            query : () => ({
                url : "/checkauth",
                method: "GET",

            }),
            providesTags:["Auth"]
        })
    })
});
export const { useSignUpMutation, useLoginMutation ,useCheckAuthQuery, useLogoutMutation } = authApi;
export default authApi.reducer;