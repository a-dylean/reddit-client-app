import { createSlice} from "@reduxjs/toolkit";

export const pageSlice = createSlice({
  name: "page",
  initialState: {
    pageNumber: 0,
    postsPerPage: 10,
    pagesVisited: 0
  },
  reducers: {
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setPagesVisited: (state) => {
      state.pagesVisited = state.pageNumber * state.postsPerPage - state.postsPerPage;
    },
    setPagesVisitedToZero: (state) => {
      state.pagesVisited = 0;
    }
  }
});
export const { setPageNumber, setPagesVisited, setPagesVisitedToZero } = pageSlice.actions;
export default pageSlice.reducer;