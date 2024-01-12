import { createSlice } from '@reduxjs/toolkit';

const configSlice = createSlice({
    name: 'config',
    initialState: {
        archived: false,
        filter: '',
        mobileMenu: false,
    },
    reducers: {
        viewArchived: ( state, action ) => {
            state.archived = action.payload;
        },
        setFilter: ( state, action ) => {
            state.filter = action.payload;
        },
        setMobileMenu: ( state, action ) => {
            state.mobileMenu = action.payload;
        }
    },
});

export const { viewArchived, setFilter, setMobileMenu } = configSlice.actions;
export default configSlice.reducer;