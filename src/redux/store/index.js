import { configureStore, Tuple } from '@reduxjs/toolkit';
import noteReducer from '../reducer/noteReducer';
import tagReducer from '../reducer/tagReducer';
import configReducer from '../reducer/configReducer';
import popupReducer from '../reducer/popupReducer';
export const store = configureStore({ 
    reducer: {
        notes: noteReducer,
        tags: tagReducer,
        config: configReducer,
        popup: popupReducer
    },
});