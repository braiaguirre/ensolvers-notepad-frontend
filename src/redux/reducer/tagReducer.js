import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const URL = "https://brianaguirre-notepad-backend.vercel.app"

export const getTags = createAsyncThunk( 'tag/get', async ( archived = false, { rejectWithValue } ) => {
    try {
        const response = await axios.get(URL + `/tag`);
        return response?.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const postTag = createAsyncThunk( 'tag/post', async ( name, { rejectWithValue } ) => {
    try {
        const response = await axios.post(URL + `/tag`, { name });
        return response?.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const deleteTag = createAsyncThunk( 'tag/delete', async ( id, { rejectWithValue } ) => {
    try {
        const response = await axios.delete(URL + `/tag/${ id }`);
        return response?.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

const tagSlice = createSlice({
    name: 'tags',
    initialState: {
        tags: [],
        error: '',
    },
    reducers: {
        clearTagsError: ( state, action ) => {
            state.error = '';
        }
    },
    extraReducers( builder ) {
        builder
            .addCase(getTags.fulfilled, (state, action) => {
                state.tags = action.payload;
            })
            .addCase(getTags.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(postTag.fulfilled, (state, action) => {
                state.tags.push(action.payload);
            })
            .addCase(postTag.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(deleteTag.fulfilled, (state, action) => {
                state.tags = state.tags.filter((tag) => tag.id !== action.payload);
            })
            .addCase(deleteTag.rejected, (state, action) => {
                state.error = action.payload;
            })
    }
});

export const { clearTagsError } = tagSlice.actions;
export default tagSlice.reducer;