import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getPosts } from "../features/posts/postsSlice";
import { FeaturedSubreddits } from "../features/subReddits/featuredSubReddits";
import { PostItem } from "../features/posts/postItem";
import {
  Grid,
  Card,
  Box,
} from "@mui/material";
import Layout from "./layout";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { SubredditInfo } from "../features/subReddits/subredditInfo";
import Loading from "./loading";

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
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          wrap="nowrap"
          spacing={3.5}
        >
          <Grid item xs={16} md={8}>
            {loading && (
              <Card>
                <Loading />
              </Card>
            )}
            <InfiniteScroll
              dataLength={Object.keys(posts).length}
              next={fetchMoreData}
              hasMore={after}
            >
              {Object.values(posts).map((post) => (
                <Box key={post.data.id}>
                  <PostItem post={post} selectedSubreddit={selectedSubreddit} />
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
              display: { xs: "none", sm: "block" },
            }}
          >
            <SubredditInfo selectedSubreddit={selectedSubreddit} />
            <FeaturedSubreddits />
          </Grid>
        </Grid>
    </Layout>
  );
};

export default PostsListPage;
