import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getComments } from "./commentsSlice";
import { Comment } from "./comment";
import { CommentsList } from "./commentsList";

import {  LinearProgress, Typography } from "@mui/material";


export const Comments = ({ postId }) => {
  const { comments, loading } = useSelector((state) => state.comments);
  const postComments = comments[postId];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getComments(postId));
  }, [postId, dispatch]);



  if (loading || !postComments) {
    return (
      <div>
        <Typography>Comments are loading...</Typography>
        <LinearProgress />
      </div>
    );
  }

  if (!loading && postComments.length > 0) {
    return (
        <CommentsList CommentsComponent={Comment} comments={postComments} />
    );
  }
};
