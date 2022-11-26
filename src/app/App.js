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

export const App = () => {
  return (
    <>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar>
          <Container>
            <Toolbar variant="dense">
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
