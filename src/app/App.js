import React from "react";
import PostPage from "./PostPage";
import { Home } from "./HomePage";
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Container,
  ThemeProvider,
  Typography,
  Box
} from "@mui/material";
import { Search } from "../features/search/search";
import { theme } from "./theme";
import { useSelector } from "react-redux";
export const App = () => {
  const selectedSubreddit = useSelector(state => state.post.selectedSubreddit)
  return (
    <>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar>
          <Container sx={{ position: "flex", justifyContent: "space-around"}}>
            <Toolbar variant="dense">
            <Link to="/" style={{textDecoration: "none", color: "white", width: "100%"}} >
            <Typography variant="h5">{selectedSubreddit}</Typography>   
            </Link>
              <Search />
            </Toolbar>
          </Container>
        </AppBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:postId" element={<PostPage />} />
        </Routes>
      </ThemeProvider>
      </BrowserRouter>
    </>
  );
};
