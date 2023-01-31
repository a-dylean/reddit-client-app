import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getComments } from "./commentsSlice";
import { Comment } from "./comment";
import { CommentsList } from "./commentsList";
import { Box } from "@mui/material";
import Loading from "../../components/loading";

export const Comments = ({ postId }) => {
  const { comments, loading } = useSelector((state) => state.comments);
  const postComments = comments[postId];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getComments(postId));
  }, [postId, dispatch]);

  return (
    <>
      {loading ? (
        <Box>
          <Loading />
        </Box>
      ) : (
        postComments?.length > 0 && (
          <CommentsList CommentsComponent={Comment} comments={postComments} />
        )
      )}
    </>
  );
};
