import React from "react";
import { CommentsList } from "./commentsList";

export const Comment = ({comment}) => {
  const unix_timestamp = comment.data.created_utc;
  const replies = comment.data?.replies?.data?.children;

  var date = new Date(unix_timestamp * 1000).toLocaleString();
  return (
    <div style={{ border: "1px solid black", margin: "10px" }}>
      {comment.data.body &&
        <div style={{ fontWeight: "bold" }}>{comment.data.author} | {date}: <div style={{ fontWeight: "normal"}}>{comment.data.body}</div>
      </div>}
      <div>
        { replies && <CommentsList CommentsComponent={Comment} comments={replies} />}
      </div>
    </div>
  );
};