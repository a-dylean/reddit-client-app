import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getComments = createAsyncThunk(
  "comments/getComments",
  async (postId) => {
    return fetch(`https://www.reddit.com/comments/${postId}.json`)
      .then((res) => res.json())
      .then((data) => ({
        comments: data.map((item) => item.data.children).flat(),
        postId,
      }));
  }
);
export const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: {},
    postId: "",
    loading: false,
  },
  extraReducers: {
    [getComments.pending]: (state, action) => {
      state.loading = true;
    },
    [getComments.fulfilled]: (state, action) => {
      state.loading = false;
      const { postId, comments } = action.payload;
      state.comments = {
        ...state.comments,
        [postId]: comments,
      };
    },
    [getComments.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default commentsSlice.reducer;
