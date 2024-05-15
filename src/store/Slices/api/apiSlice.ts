import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../utils/api";


export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    tagTypes: ['games'],
    endpoints: (builder) => ({
        getGamesWithParams: builder.query({
            query: (params) => ({
                url: `/games${params}`,
                method: 'GET'
            }),
            providesTags: ["games"],
        }),
        getGameById: builder.query({
            query: (id) => ({
                url: `/games/${id}`,
                method: 'GET'
            }),
            providesTags: ["games"],
        }),
    })
})

export const { 
    useGetGamesWithParamsQuery,
    useGetGameByIdQuery
} = apiSlice;

