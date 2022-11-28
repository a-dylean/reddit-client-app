import React from "react";
import { Container } from "@mui/material";
import { Post } from "../features/posts/post";
import { useSelector } from "react-redux";
import {Button} from "@mui/material";
import {Link, Navigate, Redirect} from "react-router-dom";


const PostPage = () => {
  const selectedPost = useSelector((state) => state.post.selectedPost);
  
  return (
      <Container sx={{ mt: "64px" }}>
        <Link to="/">
        <Button>Go back</Button>
        </Link>
        <Post post={selectedPost} />
      </Container>
  );
};

export default PostPage;
