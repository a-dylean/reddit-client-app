import React, { useEffect } from "react";
import { Container, Box, Typography, Card, LinearProgress } from "@mui/material";
import { Post } from "../features/posts/post";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getPost } from "../features/posts/postsSlice";
import Layout from './layout';

const PostPage = () => {
  const { postId, selectedSubreddit } = useParams();
  const selectedPost = useSelector((state) => state.post.posts[postId]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(postId));
  }, [postId, dispatch]);

  return (
    <Layout selectedSubreddit={selectedSubreddit}>
      <Container sx={{ mt: "3rem" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            pb: "1rem",
          }}
        ></Box>
        {selectedPost ? (
          <Post post={selectedPost} fullVersion />
        ) : (
          <Card><Typography variant="h7">Loading...</Typography><LinearProgress/></Card>
        )}
      </Container>
    </Layout>
  );
};

export default PostPage;
