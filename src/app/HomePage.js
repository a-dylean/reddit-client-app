import React from "react";
import { Subreddits } from "../features/subReddits/subReddits";
import { Postslist } from "../features/posts/postsList";
import { useSelector } from "react-redux";
import { Post } from "../features/posts/post";
import { setPageNumber, setPagesVisited } from "./pageSlice";
import { useDispatch } from "react-redux";
import {Typography, LinearProgress } from "@mui/material";

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
  const loading = useSelector(state => state.post)
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
      <Container sx={{ mt: "4rem" }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          wrap="nowrap"
          spacing={2}
        >
          <Grid item xs={8} sx={{ minWidth: 200 }}>
          {loading ? 
        <><Typography>Posts are loading...</Typography>
        <LinearProgress /> </>: ""}
            {slicedPosts.map((post) => (
              <Box key={post.data.id}>
                  <Post post={post} />
              </Box>
            ))}
          </Grid>
          <Grid item maxWidth="md" xs={4} sx={{ width: "100%", minWidth: 150, position: "sticky", top: "3rem" }}>
            <Card >
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
  );
};
