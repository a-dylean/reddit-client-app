import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (subreddit) => {
    return fetch(`https://www.reddit.com${subreddit}.json?limit=100`)
      .then((res) => res.json())
      .then((data) => data.data.children);
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    selectedSubreddit: "/r/Home",
    loading: false,
    selectedPost: {},
    fullVersion: false
  },
  reducers: {
    selectSubreddit: (state, action) => {
      state.selectedSubreddit = action.payload;
    },
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
    setFullVersion: (state) => {
      state.fullVersion = !state.fullVersion;
    }
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
    },
  },
});
export const { selectSubreddit, setSelectedPost, setFullVersion } = postsSlice.actions;
export default postsSlice.reducer;
