import { createSlice } from "@reduxjs/toolkit";
import { cars } from '../data/data';


const initialState = {
    cars
}

const carInventorySlice = createSlice({
    name: 'carInventory',
    initialState,
    reducers: {
        replaceCarInventory(state: typeof initialState, action: {payload: typeof cars, type: string}) {
            state.cars = action.payload; 
        },
    }
})

export const carInventoryActions = carInventorySlice.actions;
  
export default carInventorySlice.reducer;