import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  //const selectedSubreddit = useSelector(state => state.post.selectedSubreddit);
  return fetch("https://www.reddit.com" + "/r/pics/" + ".json")
    .then((res) => res.json())
    .then((data) => data.data.children);
});

// Slice Object
export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    selectedSubreddit: "",
    loading: false,
  },
  reducers: {
    selectSubreddit: (state, action) => {
      state.selectedSubreddit = action.payload;
    },
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
export const { selectSubreddit } = postsSlice.actions;
export default postsSlice.reducer;
