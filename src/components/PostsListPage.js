import React, { useEffect, useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getPosts } from "../features/posts/postsSlice";
import { Subreddits } from "../features/subReddits/subReddits";
import { Post } from "../features/posts/post";
import { Typography, LinearProgress, PaginationItem } from "@mui/material";
import { Container, Grid, Card, Box } from "@mui/material";
import Layout from './Layout'
import { useParams } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';

const PostsListPage = () => {
  const dispatch = useDispatch(); 
  const { selectedSubreddit = "Home" } = useParams();
  const { posts, loading, after } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPosts({ subreddit: selectedSubreddit }));
  }, [selectedSubreddit]);


  const fetchMoreData = () => {
    dispatch(getPosts({ subreddit: selectedSubreddit, after }));
  }


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
            
            <InfiniteScroll
              dataLength={Object.values(posts).length}
              next={fetchMoreData}
              hasMore={true} // fix this with after
            >
       
            {Object.values(posts).map((post) => (
              <Box key={post.data.id}>
                <Post  post={post} selectedSubreddit={selectedSubreddit}/>
              </Box>))}
          
          </InfiniteScroll>
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
