import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOn: false,
    isEdit: false,
    carData: {
        id: '',
        make: '',
        model: '',
        Year: '',
        Price: '',
        isLive: '',
    }
}

const modalFormSlice = createSlice({
    name: "modalForm",
    initialState,
    reducers: {
        turnOn(state: typeof initialState, action: {payload: boolean, type: string}) {
            state.isOn = action.payload
        },
        
        turnEdit(state: typeof initialState, action: {payload: boolean, type: string}) {
            state.isEdit = action.payload
        },

        replaceCarData(state: typeof initialState, action: {payload: typeof initialState.carData, type: string}){
            state.carData = action.payload
        },
        replaceModalForm(state: typeof initialState, action: {payload: typeof initialState, type: string}){
            state = action.payload
        },

    },
  });
  
  export const modalFormActions = modalFormSlice.actions;
  
  export default modalFormSlice.reducer;