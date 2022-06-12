import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ContactInfoApi from '../../apis/ContactInfoApi';
import { ContactModel } from '../../models/ContactModel';

interface updateContactModel {
    id: number;
    data: ContactModel;
}

interface IContactInfoState {
    contact: ContactModel;

}

const initialState = [] as Array<ContactModel>;

export const createContactInfo = createAsyncThunk(
    "contacts/create",
    async ({ id, firstName, lastName }: ContactModel) => {
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
    async ({ id, data }: updateContactModel) => {
        const res = await ContactInfoApi.update(id, data);
        return res.data;
    }
);

export const deleteContactInfo = createAsyncThunk(
    "contacts/delete",
    async ({ id }: ContactModel) => {
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
    async ({ firstName }: ContactModel) => {
        const res = await ContactInfoApi.findByTitle(firstName);
        return res.data;
    }
);

const contactInfoSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {},
    // extraReducers: {
    //     [createContactInfo.fulfilled as any]: (state : any, action: PayloadAction<ContactModel>) => {
    //         state.push(action.payload);
    //       },
    //       [retrieveContacts.fulfilled as any]: (state : any, action :PayloadAction<any>) => {
    //         state.push(...action.payload);
    //       },
    //       [updateContactInfo.fulfilled as any]: (state : any, action : PayloadAction<ContactModel>) => {
    //         const index = state.findIndex(
    //           (contact : ContactModel) => contact.id === action.payload.id
    //         );
    //         state[index] = {
    //           ...state[index],
    //           ...action.payload,
    //         };
    //       },

    //       [deleteContactInfo.fulfilled as any]: (state : any, action : PayloadAction<ContactModel>) => {
    //         let index = state.findIndex(({ id } : ContactModel) => id === action.payload.id);
    //         state.splice(index, 1);
    //       },

    //       [deleteAllContactInfo.fulfilled as any]: (state : any, action : PayloadAction<ContactModel>) => {
    //         return [];
    //       },

    //       [findContactInfosByTitle.fulfilled as any]: (state : any, action : PayloadAction<any>) => {
    //         return [...action.payload];
    //       },
    // }

    extraReducers: (builder) => {
        builder.addCase(createContactInfo.fulfilled, (state, action: PayloadAction<any>) => {
            state.push(action.payload);
        })

        builder.addCase(retrieveContacts.fulfilled, (state : Array<ContactModel>, action: PayloadAction<any>) => {
            state.push(...action.payload);

        })

        builder.addCase(updateContactInfo.fulfilled, (state, action: PayloadAction<any>) => {
            const index = state.findIndex(
                (contact: ContactModel) => contact.id === action.payload.id
            );
            state[index] = {
                ...state[index],
                ...action.payload,
            };
        })

        builder.addCase(deleteContactInfo.fulfilled, (state, action: PayloadAction<any>) => {
            let index = state.findIndex(({ id } : ContactModel) => id === action.payload.id);
            state.splice(index, 1);
        })

        builder.addCase(deleteAllContactInfo.fulfilled, (state, action: PayloadAction<any>) => {
            return [];
        })

        builder.addCase(findContactInfosByTitle.fulfilled, (state, action: PayloadAction<any>) => {
            return [...action.payload];
        })
    }

})


export default contactInfoSlice.reducer;
