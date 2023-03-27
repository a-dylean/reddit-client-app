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

export const getSubredditInfo = createAsyncThunk(
  "subreddits/getSubredditInfo",
  async (subreddit) => {
    return fetch(`https://www.reddit.com/r/${subreddit}/about.json`)
    .then((res) => res.json())
    .then((data) => data.data)
  }
);

// Slice Object
export const subRedditsSlice = createSlice({
  name: "subreddits",
  initialState: {
    subreddits: [],
    featuredSubreddits: [],
    loading: true,
    featuredSubredditsLoading: true,
    subredditInfo: {}
  },
  reducers: {},
  extraReducers: {
    [getSubreddits.pending]: (state) => {
      state.featuredSubredditsLoading = true;
    },
    [getSubreddits.fulfilled]: (state, action) => {
      state.featuredSubredditsLoading = false;
      state.featuredSubreddits = action.payload;
    },
    [getSubreddits.rejected]: (state) => {
      state.featuredSubredditsLoading = false;
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
    [getSubredditInfo.pending]: (state) => {
      state.loading = true;
    },
    [getSubredditInfo.fulfilled]: (state, action) => {
      state.loading = false;
      state.subredditInfo = action.payload;
    },
    [getSubredditInfo.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default subRedditsSlice.reducer;
