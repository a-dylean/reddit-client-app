// Reducers & Actions

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getSubreddits = createAsyncThunk("subreddits/getSubreddits", async () => {
    return fetch("https://www.reddit.com/r/popular.json").then((res) => res.json()).then((data) => data.data.children);
});

// Slice Object
export const subRedditsSlice = createSlice({
    name: 'subreddits',
    initialState: {
        subreddits: [],
        selectedSubreddit: null
    },
    reducers: {
        
        },
    extraReducers: {
        [getSubreddits.pending]: (state, action) => {
            state.loading = true;
        },
        [getSubreddits.fulfilled]: (state, action) => {
            state.loading = false;
            state.subreddits = action.payload;
        },
        [getSubreddits.rejected]: (state, action) => {
            state.loading = false;
        }
    }
});


//export const { getSubreddits } = subRedditsSlice.actions;
export default subRedditsSlice.reducer;
