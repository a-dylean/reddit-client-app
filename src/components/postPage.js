import React, { useEffect } from "react";
import { Container } from "@mui/material";
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
        {selectedPost && (
          <Post post={selectedPost} fullVersion/>
        )}
    </Layout>
  );
};

export default PostPage;
