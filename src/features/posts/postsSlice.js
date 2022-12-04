import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (subreddit) => {
    return fetch(`https://www.reddit.com/r/${subreddit}.json?limit=100`)
      .then((res) => res.json())
      .then((data) => data.data.children);
  }
);

export const getPost = createAsyncThunk(
  "posts/getPost",
  async (postId) => {
    return fetch(`https://api.reddit.com/api/info/?id=t3_${postId}`)
      .then((res) => res.json())
      .then((data) => Object.assign({}, data.data.children[0]));
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: {},
    loading: false,
  },
  reducers: {
    selectSubreddit: (state, action) => {
      state.selectedSubreddit = action.payload;
      state.posts = {};
    },
  },
  extraReducers: {
    [getPosts.pending]: (state) => {
      state.loading = true;
    },
    [getPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = action.payload.reduce(
        (accumulator, post) => ({...accumulator, [post.data.id]: post}),
        state.posts,
      )
    },
    [getPosts.rejected]: (state) => {
      state.loading = false;
    },
    [getPost.pending]: (state) => {
      state.loading = true;
    },
    [getPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = {
        ...state.posts,
        [action.payload.data.id]: action.payload
      };
    },
    [getPost.pending]: (state) => {
      state.loading = false;
    }
  },
});
export const { selectSubreddit } = postsSlice.actions;
export default postsSlice.reducer;
