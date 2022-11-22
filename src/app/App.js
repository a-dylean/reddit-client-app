import React from "react";
import { Search } from "../features/search/search";
import { Subreddits } from "../features/subReddits/subReddits";
import { Postslist } from "../features/posts/postsList";
import { useSelector } from "react-redux";
import { Post } from "../features/posts/post";
import { setPageNumber, setPagesVisited } from "./pageSlice";
import { useDispatch } from "react-redux";

import "@fontsource/roboto/300.css";
import {
  Container,
  Grid,
  Stack,
  Card,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Box,
  GlobalStyles,
  createTheme,
  ThemeProvider
} from "@mui/material";

import Pagination from "@mui/material/Pagination";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body {
          background-color: #e0e0e0;
        }
      `,
    },
},
typography: {
  allVariants: {
    fontFamily: 'Verdana',
    textTransform: 'none',
    wordBreak: "break-word"
  },
  h5: {
      fontSize: 18,
  }
}});

export const App = () => {
  const posts = useSelector((state) => state.post.posts);
  const { pageNumber, postsPerPage, pagesVisited } = useSelector(
    (state) => state.page
  );

  const slicedPosts = posts.slice(pagesVisited, pagesVisited + postsPerPage);

  const pageCount = Math.ceil(posts.length / postsPerPage);

  const dispatch = useDispatch();

  const handlePageClick = (event, value) => {
    dispatch(setPageNumber(value));
    dispatch(setPagesVisited());
  };

  return (
    <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        sx={{
          backgroundColor: "#757575",
        }}
      >
        <Container>
          <Toolbar variant="dense">
            <Search />
          </Toolbar>
        </Container>
      </AppBar>

      <Container sx={{ mt: "64px" }}>
        <Postslist />
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          wrap="nowrap"
          spacing={2}
        >
          <Grid item xs={8} sx={{ minWidth: 200 }}>
            {slicedPosts.map((post) => (
              <Box key={post.data.id} >
                <Post post={post} />
              </Box>
            ))}
          </Grid>

          <Grid
            item
            maxWidth="md"
            xs={4}
            sx={{ width: "100%",  minWidth: 150 }}
          >
            <Card>
              <Subreddits />
            </Card>
          </Grid>
        </Grid>
          <Pagination
            count={pageCount}
            onChange={handlePageClick}
            page={pageNumber}
            defaultPage={0}
            siblingCount={2}
            boundaryCount={3}
            color="primary"
          />
      </Container></ThemeProvider>
    </>
  );
};

export default App;
