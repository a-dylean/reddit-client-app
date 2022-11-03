import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getComments } from "./commentsSlice";
import { Comment } from "./comment";
import { CommentsList } from "./commentsList";

export const Comments = ({ postId }) => {
  const { comments, loading } = useSelector((state) => state.comments);
  const postComments = comments[postId];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getComments(postId));
  }, [postId]);

  if (loading || !postComments) {
    return "Loading...";
  }

  if (!loading && postComments.length > 0) {
    return (
      <div>
        <CommentsList CommentsComponent={Comment} comments={postComments} />
      </div>
    );
  }
};
