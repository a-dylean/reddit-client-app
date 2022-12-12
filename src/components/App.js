import React from "react";
import PostPage from "./PostPage";
import PostsListPage from "./PostsListPage";
import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import {
  CssBaseline,
  ThemeProvider
} from "@mui/material";
import { theme } from "./theme";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
             <Route path="/r/:selectedSubreddit/:postId" element={<PostPage />} />
             <Route path="/r/:selectedSubreddit" element={<PostsListPage />} /> 
             <Route exact path="/" element={<PostsListPage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
};
