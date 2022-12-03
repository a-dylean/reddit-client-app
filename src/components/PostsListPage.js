import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getPosts } from "../features/posts/postsSlice";
import { Subreddits } from "../features/subReddits/subReddits";
import { Post } from "../features/posts/post";
import { setPageNumber, setPagesVisited } from "./pageSlice";
import { Typography, LinearProgress, PaginationItem } from "@mui/material";
import { Container, Grid, Card, Box } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Layout from './Layout'
import { useParams } from "react-router-dom";

const PostsListPage = () => {
  const dispatch = useDispatch();
  const {selectedSubreddit = "Home"} = useParams();
  const { posts, loading } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(getPosts(selectedSubreddit));
  }, [selectedSubreddit, dispatch]);
  const { pageNumber, postsPerPage, pagesVisited } = useSelector(
    (state) => state.page
  );
  const slicedPosts = Object.values(posts).slice(
    pagesVisited,
    pagesVisited + postsPerPage
  );

  const pageCount = Math.ceil(Object.values(posts).length / postsPerPage);

  const handlePageClick = (event, pageNumber) => {
    dispatch(setPageNumber(pageNumber));
    dispatch(setPagesVisited());
  };

  return (
    <Layout selectedSubreddit={selectedSubreddit}>
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
            {loading ? (
              <Card>
                <Typography variant="h7">Posts are loading...</Typography>
                <LinearProgress />{" "}
              </Card>
            ) : (
              ""
            )}
            {slicedPosts.map((post) => (
              <Box key={post.data.id}>
                <Post post={post} selectedSubreddit={selectedSubreddit}/>
              </Box>
            ))}
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Pagination
                variant="outlined"
                count={pageCount}
                onChange={handlePageClick}
                page={pageNumber}
                boundaryCount={3}
                color="primary"
                renderItem={(item) => (
                  <PaginationItem
                    slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                    {...item}
                  />
                )}
              />
            </Box>
          </Grid>
          <Grid
            item
            maxWidth="md"
            xs={4}
            sx={{
              width: "100%",
              minWidth: 150,
              position: "sticky",
              top: "3rem",
            }}
          >
            <Card>
              <Subreddits />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default PostsListPage;
