import { createSlice } from '@reduxjs/toolkit';

const initialSate = {
    type: '',
    title: '',
    content: '',
    callbacks: []
}

const notesSlice = createSlice({
    name: 'app',
    initialState: initialSate,
    reducers: {
        setPopup: ( state, action ) => ({
            type: action.payload.type,
            title: action.payload.title,
            content: action.payload.content,
            callbacks: action.payload.callbacks
        }),
        clearPopup: ( state, action ) => initialSate,
    },
});

export const { setPopup, clearPopup } = notesSlice.actions;

export default notesSlice.reducer;
