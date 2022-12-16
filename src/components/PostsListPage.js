import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getPosts } from "../features/posts/postsSlice";
import { Subreddits } from "../features/subReddits/subReddits";
import { Post } from "../features/posts/post";
import { Typography, LinearProgress } from "@mui/material";
import { Container, Grid, Card, Box } from "@mui/material";
import Layout from './Layout'
import { useParams } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';
import useWindowSize from "./useWindowSize";

const PostsListPage = () => {
  const dispatch = useDispatch(); 
  const { selectedSubreddit = "Home" } = useParams();
  const { posts, loading, after } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPosts({ subreddit: selectedSubreddit }));
  }, [selectedSubreddit, dispatch]);


  const fetchMoreData = () => {
    dispatch(getPosts({ subreddit: selectedSubreddit, after }));
  }

  const size = useWindowSize();

  return (
    <Layout selectedSubreddit={selectedSubreddit}>
      <Container sx={{ mt: "5rem" }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          wrap="nowrap"
          spacing={2}
        >
          <Grid item 
          xs={16} 
          md={8}>
            {loading ? (
              <Card>
                <Typography variant="h7">Posts are loading...</Typography>
                <LinearProgress />{" "}
              </Card>
            ) : (
              ""
            )}
            <InfiniteScroll
              dataLength={Object.values(posts).length}
              next={fetchMoreData}
              hasMore={after}
            >
            {Object.values(posts).map((post) => (
              <Box key={post.data.id}>
                <Post  post={post} selectedSubreddit={selectedSubreddit}/>
              </Box>))}
          </InfiniteScroll>
          </Grid>
          {size.width > 600 && <Grid
            item
            maxWidth="md"
            xs={0}
            md={4}
            sx={{
              width: "100%",
              position: "sticky",
              top: "4rem",
            }}
          >
            <Card>
              <Subreddits />
            </Card>
          </Grid>}
        </Grid>
      </Container>
    </Layout>
  );
    
};

export default PostsListPage;
