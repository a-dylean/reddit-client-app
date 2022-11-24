import React from "react";
import { Subreddits } from "../features/subReddits/subReddits";
import { Postslist } from "../features/posts/postsList";
import { useSelector } from "react-redux";
import { Post } from "../features/posts/post";
import { setPageNumber, setPagesVisited } from "./pageSlice";
import { useDispatch } from "react-redux";
import { theme } from "./theme";

import {
  Container,
  Grid,
  Card,
  Box,
  ThemeProvider,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";

export const Home = () => {
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
    <ThemeProvider theme={theme}>
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
              <Box key={post.data.id}>
                  <Post post={post} />
              </Box>
            ))}
          </Grid>
          <Grid item maxWidth="md" xs={4} sx={{ width: "100%", minWidth: 150, position: "sticky", top: "3rem" }}>
            <Card sx={{}}>
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
      </Container>
    </ThemeProvider>
  );
};
