import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import modalForm from './modalFormSlice';
import snackBar from './snackBarSlice';
import {api} from './mainApi'


export const createStore = (options?: ConfigureStoreOptions['preloadedState'] | undefined) =>
  configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      modalForm,
      snackBar,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
    // devTools: false,
    ...options,
  });

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;