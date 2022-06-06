import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    successOn: false,
    errorOn: false,
    message: ''
}

const snackBarSlice = createSlice({
    name: 'snackBar',
    initialState,
    reducers: {
        turnSuccess(state: typeof initialState, action: {payload: {on: boolean, message: string}, type: string}) {
            state.successOn= action.payload.on;
            state.message= action.payload.message
        },
        turnError(state: typeof initialState, action: {payload: {on: boolean, message: string}, type: string}) {
            state.errorOn= action.payload.on
            state.message= action.payload.message
        }
    }
})

export const snackBarActions = snackBarSlice.actions;
  
export default snackBarSlice.reducer;