import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const URL = "http://localhost:3001"

export const getNote = createAsyncThunk( 'note/get', async ( id, { rejectWithValue } ) => {
    try {
        const response = await axios.get(URL + `/note/${ id }`);
        return response?.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const getNotes = createAsyncThunk( 'notes/get', async ( { archived, filter }, { rejectWithValue } ) => {
    try {
        const response = await axios.get(URL + `/note?archived=${ archived }&filter=${ filter }`);
        return response?.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const postNote = createAsyncThunk( 'notes/post', async ( content, { rejectWithValue } ) => {
    try {
        const response = await axios.post(URL + `/note`, { content });
        return response?.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const editNote = createAsyncThunk( 'notes/edit', async ( { id, title, content }, { rejectWithValue } ) => {
    try {
        const response = await axios.put(URL + `/note`, { id, title, content });
        return response?.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const archiveRestoreNote = createAsyncThunk( 'notes/archiveRestore', async ( id, { rejectWithValue } ) => {
    try {
        const response = await axios.delete(URL + `/note/archive/${ id }`);
        return response?.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const deleteNote = createAsyncThunk( 'notes/delete', async ( id, { rejectWithValue } ) => {
    try {
        const response = await axios.delete(URL + `/note/${ id }`);
        return response?.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const addTagNote = createAsyncThunk( 'notes/addTagNote', async ( { id, tags, archived }, { rejectWithValue } ) => {
    try {
        const response = await axios.post(URL + `/note/tag/`, { id, tags, archived });
        return response?.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

const notesSlice = createSlice({
    name: 'notes',
    initialState: {
        notes: [],
        error: ''
    },
    reducers: {
        clearNotesError: ( state, action ) => {
            state.error = '';
        }
    },
    extraReducers( builder ) {
        builder
            .addCase(getNotes.fulfilled, (state, action) => {
                state.notes = action.payload;
            })
            .addCase(getNotes.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(postNote.fulfilled, (state, action) => {
                state.notes.unshift(action.payload);
            })
            .addCase(postNote.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(editNote.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(archiveRestoreNote.fulfilled, (state, action) => {
                state.notes = state.notes.filter((note) => note.id !== action.payload);
            })
            .addCase(archiveRestoreNote.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(deleteNote.fulfilled, (state, action) => {
                state.notes = state.notes.filter((note) => note.id !== action.payload);
            })
            .addCase(deleteNote.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(addTagNote.fulfilled, (state, action) => {
                state.notes = action.payload;
            })
            .addCase(addTagNote.rejected, (state, action) => {
                state.error = action.payload;
            })
    }
});

export const { clearNotesError } = notesSlice.actions;
export default notesSlice.reducer;
