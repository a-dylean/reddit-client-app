import React from "react";
import PostPage from "./PostPage";
import { Home } from "./HomePage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Container,
  ThemeProvider,
} from "@mui/material";
import { Search } from "../features/search/search";
import { theme } from "./theme";
import { Postslist } from "../features/posts/postsList";
export const App = () => {
  return (
    <>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar>
          <Container sx={{ position: "flex", justifyContent: "space-around"}}>
            <Toolbar variant="dense" >
            <Postslist/>
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
