import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getComments = createAsyncThunk(
  "comments/getComments",
  async (postId) => {
    return fetch(`https://www.reddit.com/comments/${postId}.json`)
      .then((res) => res.json())
      .then((data) => ({
        comments: data.map((item) => item.data.children).flat(),
        postId,
      }))
      .catch((error) => console.error('rejected', error));
  }
);
export const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: {},
    loading: false,
    isError: false,
    errorMessage: null
  },
  extraReducers: {
    [getComments.pending]: (state) => {
      state.loading = true;
      state.isError = false;
    },
    [getComments.fulfilled]: (state, action) => {
      state.loading = false;
      state.isError = false;
      const { postId, comments } = action.payload;
      state.comments = {
        ...state.comments,
        [postId]: comments,
      };
    },
    [getComments.rejected]: (state, action) => {
      state.loading = false; 
      state.isError = true;  
      state.errorMessage = action.payload;
      }
    },
  },
);

export default commentsSlice.reducer;
