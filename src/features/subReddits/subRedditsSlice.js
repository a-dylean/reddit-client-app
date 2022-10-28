// Reducers & Actions

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetching Data using API with createAsyncThunk (Redux-Toolkit)
export const getSubreddits = createAsyncThunk(
  "subreddits/getSubreddits",
  async () => {
    return fetch("https://www.reddit.com/subreddits.json")
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
    [getSubreddits.pending]: (state, action) => {
      state.loading = true;
    },
    [getSubreddits.fulfilled]: (state, action) => {
      state.loading = false;
      state.subreddits = action.payload;
    },
    [getSubreddits.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default subRedditsSlice.reducer;
