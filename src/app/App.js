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
  Typography
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
            <Toolbar variant="dense" >
            <Typography variant="h5" sx={{width: "30%"}}>{selectedSubreddit}</Typography>
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
