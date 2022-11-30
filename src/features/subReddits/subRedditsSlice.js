// Reducers & Actions

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetching Data using API with createAsyncThunk (Redux-Toolkit)
export const getSubreddits = createAsyncThunk(
  "subreddits/getSubreddits",
  async () => {
    return fetch("https://www.reddit.com/subreddits.json?limit=1000")
      .then((res) => res.json())
      .then((data) => data.data.children);
  }
);

export const searchSubreddits = createAsyncThunk(
  "subreddits/searchSubreddits",
  async (searchTerm) => {
    return fetch(`https://www.reddit.com/search.json?q=${searchTerm}&type=sr`)
      .then((res) => res.json())
      .then((data) => data.data.children);
  }
);

// Slice Object
export const subRedditsSlice = createSlice({
  name: "subreddits",
  initialState: {
    subreddits: [],
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [getSubreddits.pending]: (state) => {
      state.loading = true;
    },
    [getSubreddits.fulfilled]: (state, action) => {
      state.loading = false;
      state.subreddits = action.payload;
    },
    [getSubreddits.rejected]: (state) => {
      state.loading = false;
    },
    [searchSubreddits.pending]: (state) => {
      state.loading = true;
    },
    [searchSubreddits.fulfilled]: (state, action) => {
      state.loading = false;
      state.subreddits = action.payload;
    },
    [searchSubreddits.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default subRedditsSlice.reducer;
