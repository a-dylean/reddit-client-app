import React, { useEffect } from "react";
import { Container, Box } from "@mui/material";
import { Post } from "../features/posts/post";
import { useSelector, useDispatch} from "react-redux";
import { useParams} from "react-router-dom";
import { getPost } from "../features/posts/postsSlice";

const PostPage = () => {
  const { postId } = useParams();
  const selectedPost = useSelector((state) => state.post.posts[postId]);
  const post = useSelector((state) => state.post.post)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(postId));
  }, [postId, dispatch]);
  

  return (
    <>
    <Container sx={{ mt: "64px" }}>
     <Box sx={{display: "flex", justifyContent: "center",
          alignItems:"flex-start", pb: "1rem"}}>
      </Box>
      {selectedPost ? <Post post={selectedPost} fullVersion={true}/>
: 'loading' }
      </Container>
      </>
  );
};

export default PostPage;
