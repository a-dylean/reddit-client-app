import React from "react";
import DefaultPage from "./DefaultPage";
import PostPage from "./PostPage";
import HomePage from "./HomePage";
import {
  Routes,
  Route,
  BrowserRouter,
  Link
} from "react-router-dom";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Container,
  ThemeProvider,
  Typography,
  Box,
} from "@mui/material";
import { Search } from "../features/search/search";
import { theme } from "./theme";
import { useSelector } from "react-redux";

export const App = () => {
  const selectedSubreddit = useSelector(
    (state) => state.post.selectedSubreddit
  );



  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar>
            <Toolbar
              variant="dense"
              sx={{ display: "flex", justifyContent: "space-around"}}
            >
              <Link to={`${selectedSubreddit}`} style={{ textDecoration: "none", color: "white" }}>
                <Typography variant="h5" width="100%">
                  {selectedSubreddit}
                </Typography>
              </Link>
              <Search />
            </Toolbar>
          </AppBar>
          <Routes>
            <Route exact path="/" element={<DefaultPage />} />
            <Route path={`${selectedSubreddit}`} element={<HomePage />} />
            <Route path="/:postId" element={<PostPage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
};
