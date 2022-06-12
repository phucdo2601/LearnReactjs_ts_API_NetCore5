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

export default store;
