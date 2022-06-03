import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import carInventory from './carInventorySlice';
import modalForm from './modalFormSlice'


export const createStore = (options?: ConfigureStoreOptions['preloadedState'] | undefined) =>
  configureStore({
    reducer: {
    //   [mainApi.reducerPath]: mainApi.reducer,
      carInventory,
      modalForm,
    },
    // middleware: (getDefaultMiddleware) =>
    //   getDefaultMiddleware().concat(mainApi.middleware),
    // devTools: false,
    ...options,
  });

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;