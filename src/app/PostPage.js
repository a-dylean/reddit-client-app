import React from "react";
import { Container } from "@mui/material";
import { Post } from "../features/posts/post";
import { useSelector } from "react-redux";
import {Button} from "@mui/material";
import {Link, useParams} from "react-router-dom";


const PostPage = () => {
  const { postId } = useParams();
  const selectedPost = useSelector((state) => state.post.posts[postId]);
  
  return (
      <Container sx={{ mt: "64px" }}>
        <Link to="/">
        <Button>Go back</Button>
        </Link>
        <Post post={selectedPost} fullVersion={true} />
      </Container>
  );
};

export default PostPage;
