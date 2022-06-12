import { configureStore } from "@reduxjs/toolkit";
import ContactInfoSlice from "../slices/contactInfoSlice";

const reducer = {
  contacts: ContactInfoSlice,
};

const store = configureStore({
  reducer: {
    contacts: ContactInfoSlice,
  },
  devTools: true,
});

type StoreType = typeof store;
export type AppDispatch = StoreType['dispatch'];

type Config = {
  dispatch: AppDispatch;
};

export type RootState = ReturnType<typeof store.getState>

export default store;