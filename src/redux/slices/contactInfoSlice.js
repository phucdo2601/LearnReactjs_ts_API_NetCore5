import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ContactInfoApi from "../../services/ContactInfoApi";

const initialState = [];

export const createContactInfo = createAsyncThunk(
  "contacts/create",
  async ({ id, firstName, lastName }) => {
    const res = await ContactInfoApi.create({ id, firstName, lastName });
    return res.data;
  }
);

export const retrieveContacts = createAsyncThunk(
  "contacts/retrieve",
  async () => {
    const res = await ContactInfoApi.getAll();
    console.log(res.data);
    return res.data;
  }
);

export const updateContactInfo = createAsyncThunk(
  "contacts/update",
  async ({ id, data }) => {
    const res = await ContactInfoApi.update(id, data);
    return res.data;
  }
);

export const deleteContactInfo = createAsyncThunk(
  "contacts/delete",
  async ({ id }) => {
    await ContactInfoApi.remove(id);
    return { id };
  }
);

export const deleteAllContactInfo = createAsyncThunk(
  "contacts/deleteAll",
  async () => {
    const res = await ContactInfoApi.removeAll();
    return res.data;
  }
);

export const findContactInfosByTitle = createAsyncThunk(
  "contacts/findLike",
  async ({ firstName }) => {
    const res = await ContactInfoApi.findByTitle(firstName);
    return res.data;
  }
);

const contactInfoSlice = createSlice({
  name: "contact",
  initialState,
  extraReducers: {
    [createContactInfo.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrieveContacts.fulfilled]: (state, action) => {
      state.push(...action.payload);
    },
    [updateContactInfo.fulfilled]: (state, action) => {
      const index = state.findIndex(
        (contact) => contact.id === action.payload.id
      );
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },

    [deleteContactInfo.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },

    [deleteAllContactInfo.fulfilled]: (state, action) => {
      return [];
    },

    [findContactInfosByTitle.fulfilled]: (state, action) => {
      return [...action.payload];
    },
  },
});

// const { reducer } = ContactInfoSlice;
export default contactInfoSlice.reducer;
