import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface car {
    make: string,
    model: string, 
    year: string,
    price: string, 
    isLive: boolean,
}


export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://car-inventory-c44a5-default-rtdb.firebaseio.com/cars" }),
  endpoints: (build) => ({
    getCars: build.query<{[key: string]: car}, null>({
      query: () => '.json',

    }),

    addCar: build.mutation<{name: string}, car>({
      query: (body) => ({
        url: `.json`,
        method: 'POST',
        body,
      }),

    }),

    updateCar: build.mutation<any, {id: string, patch: car}>({
      query: (input) => ({
        url: `/${input.id}.json`,
        method: 'PUT',
        body: input.patch
      }),
    }),
    // deleteCar: build.mutation<{ success: boolean; id: string }, string>({
    deleteCar: build.mutation<any, string>({
      query(id) {
        return {
          url: `/${id}.json`,
          method: 'DELETE',
        }
      },
    }),
  }),
})

export const {
    useGetCarsQuery,
    useAddCarMutation,
    useUpdateCarMutation,
    useDeleteCarMutation,
  } = api