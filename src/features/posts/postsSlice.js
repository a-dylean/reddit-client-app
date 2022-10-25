import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
    return fetch("https://www.reddit.com/r/AskReddit.json").then((res) => res.json()).then((data) => data.data.children);
});

// Slice Object
export const postsSlice = createSlice(({
    name: 'posts',
    initialState: {
        posts: [],
        loading: false
    },
    reducers: {
        
        },
    extraReducers: {
        [getPosts.pending]: (state, action) => {
            state.loading = true;
        },
        [getPosts.fulfilled]: (state, action) => {
            state.loading = false;
            state.posts = action.payload;
        },
        [getPosts.rejected]: (state, action) => {
            state.loading = false;
        }
    }
}));

export default postsSlice.reducer;
