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
  const loading = useSelector((state) => state.post.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(postId));
  }, [postId, dispatch]);

  return (
    <Layout selectedSubreddit={selectedSubreddit}>
      <Container sx={{ mt: "4rem" }}>
        {loading && (<Card><Typography variant="h7">Loading...</Typography><LinearProgress/></Card>
        )}
        {selectedPost && (
          <Post post={selectedPost} fullVersion/>
        )}
      </Container>
    </Layout>
  );
};

export default PostPage;
