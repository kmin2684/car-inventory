import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOn: false,
    isEdit: false,
    carData: {
        id: '',
        make: '',
        model: '',
        year: '',
        price: '',
        isLive: true,
    }
}

const modalFormSlice = createSlice({
    name: "modalForm",
    initialState,
    reducers: {
        turnOn(state: typeof initialState, action: {payload: boolean, type: string}) {
            state.isOn = action.payload
            state.carData = initialState.carData; 
        },
        
        turnEdit(state: typeof initialState, action: {payload: boolean, type: string}) {
            state.isEdit = action.payload
        },

        replaceCarData(state: typeof initialState, action: {payload: typeof initialState.carData, type: string}){
            state.carData = action.payload
        },
        replaceModalForm(state: typeof initialState, action: {payload: typeof initialState, type: string}){
            state.isOn = action.payload.isOn;
            state.isEdit = action.payload.isEdit;
            state.carData = action.payload.carData;
        },
        addNew(state: typeof initialState, action: {type: string}) {
            state.isOn = true;
            state.isEdit = false;
            state.carData= {
                id: '1',
                make: '',
                model: '',
                year: '',
                price: '',
                isLive: true,
            }
        },
        updatePrice(state: typeof initialState, action: {payload: string , type: string}) {
            state.carData.price = action.payload
        },
    } 
  });
  
  export {initialState};

  export const modalFormActions = modalFormSlice.actions;
  
  export default modalFormSlice.reducer;