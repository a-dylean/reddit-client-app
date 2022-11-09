import React from "react";
import { Search } from "../features/search/search";
import { Subreddits } from "../features/subReddits/subReddits";
import { Postslist } from "../features/posts/postsList";
import { useSelector } from "react-redux";
import { Post } from "../features/posts/post";
import { setPageNumber, setPagesVisited } from "./pageSlice";
import { useDispatch } from "react-redux";

import '@fontsource/roboto/300.css';
import { Container, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export const App = () => {
  const posts = useSelector((state) => state.post.posts);
  const { pageNumber, postsPerPage, pagesVisited } = useSelector(
    (state) => state.page
  );

  const displayPosts = posts
    .slice(pagesVisited, pagesVisited + postsPerPage)
    .map((post) => <Post post={post} key={post.data.id} />);

  const pageCount = Math.ceil(posts.length / postsPerPage);

  const dispatch = useDispatch();
  
  const handlePageClick = (event, value) => {
    dispatch(setPageNumber(value));
    dispatch(setPagesVisited());
  };

  return (
    <Container>
      <Typography>
          <Search />
          <Grid
            container
            direction="row"
            justify="center"
            spacing={2}
          >
            <Grid item xs={6} md={8} minWidth={250}>
                <Postslist />
                {displayPosts}
            </Grid>
            <Grid item xs={6} md={4}>
              <Subreddits />
            </Grid>
          </Grid>
          <Stack spacing={2}>
            <Pagination       
              count={pageCount}
              onChange={handlePageClick} 
              page={pageNumber}
              defaultPage={1}
              siblingCount={2}
              boundaryCount={3}
              color='primary'
              />
          </Stack>
          </Typography>
    </Container>
  );
};

export default App;
