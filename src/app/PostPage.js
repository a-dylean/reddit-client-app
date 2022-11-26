import React from "react";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme";
import { Container } from "@mui/material";
import { Post } from "../features/posts/post";
import { useSelector } from "react-redux";
import {Button} from "@mui/material";
import {Link, useParams} from "react-router-dom";


const PostPage = () => {
  const { postId } = useParams();
  const selectedPost = useSelector((state) => state.post.posts[postId]);
  
  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ mt: "64px" }}>
        <Link to="/">
        <Button>Go back</Button>
        </Link>
        <Post post={selectedPost} fullVersion={true} />
      </Container>
    </ThemeProvider>
  );
};

export default PostPage;
