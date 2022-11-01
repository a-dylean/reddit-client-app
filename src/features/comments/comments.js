import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getComments } from "./commentsSlice";
import { Comment } from "./comment";

export const Comments = ({ postId }) => {
  const { comments, loading } = useSelector((state) => state.comments);
  const postComments = comments[postId];
  console.log(postId);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getComments(postId));
  }, [postId]);

  if (loading || !postComments) {
    return "Loading...";
  }

  console.log(postComments);

  if (!loading && postComments.length > 0) {
    return (
      <div>
        {postComments.map((comment) => (
          <Comment comment={comment} key={comment.data.id} />
        ))}
      </div>
    );
  }
};
