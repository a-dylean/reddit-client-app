import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getComments } from "./commentsSlice";
import { Comment } from "./commentItem";
import { CommentsList } from "./commentsList";
import { Box } from "@mui/material";
import Loading from "../../components/loading";
import { unwrapResult } from "@reduxjs/toolkit";

export const Comments = ({ postId }) => {
  const { comments, loading } = useSelector((state) => state.comments);
  const postComments = comments[postId];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getComments(postId))
    .then(unwrapResult)
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
