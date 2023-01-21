import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getPosts } from "../features/posts/postsSlice";
import { FeaturedSubreddits } from "../features/subReddits/featuredSubReddits";
import { Post } from "../features/posts/post";
import { Typography, LinearProgress, Container, Grid, Card, Box, ListSubheader } from "@mui/material";
import Layout from "./layout";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { SubredditInfo } from "../features/subReddits/subredditInfo";

const PostsListPage = () => {
  const dispatch = useDispatch();
  const { selectedSubreddit = "Home" } = useParams();
  const { posts, loading, after } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPosts({ subreddit: selectedSubreddit }));
  }, [selectedSubreddit, dispatch]);

  const fetchMoreData = () => {
    dispatch(getPosts({ subreddit: selectedSubreddit, after }));
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
          spacing={3.5}
        >
          <Grid item xs={16} md={8}>
            {loading ? (
              <Card>
                <Typography variant="h7">Posts are loading...</Typography>
                <LinearProgress />{" "}
              </Card>
            ) : (
              ""
            )}
            <InfiniteScroll
              dataLength={Object.keys(posts).length}
              next={fetchMoreData}
              hasMore={after}
            >
              {Object.values(posts).map((post) => (
                <Box key={post.data.id}>
                  <Post post={post} selectedSubreddit={selectedSubreddit} />
                </Box>
              ))}
            </InfiniteScroll>
          </Grid>
              <Grid
                item
                maxWidth="md"
                xs={0}
                md={4}
                sx={{
                  width: "100%",
                  top: "3rem",
                  minWidth: "23rem",
                  display: {xs: "none", sm: "block"} 
                }}
              >
                <Card sx={{ mb: "1rem" }}>
                  <SubredditInfo selectedSubreddit={selectedSubreddit}/>
                </Card>
                <Card>
                <ListSubheader>FEATURED SUBREDDITS</ListSubheader>
                  <FeaturedSubreddits />
                </Card>
              </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default PostsListPage;
