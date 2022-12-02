import React from "react";
import DefaultPage from "./DefaultPage";
import PostPage from "./PostPage";
import PostListPage from "./PostListPage";
import Layout from "./Layout";
import {
  Routes,
  Route,
  BrowserRouter,
  useParams
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
             <Route path="/r/:selectedSubreddit" element={<PostListPage />} /> 
             <Route exact path="/" element={<DefaultPage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
};
