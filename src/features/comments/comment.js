import React, { useState } from "react";
import { CommentsList } from "./commentsList";

export const Comment = ({ comment }) => {
  const unix_timestamp = comment.data.created_utc;
  const replies = comment.data?.replies?.data?.children;

  var date = new Date(unix_timestamp * 1000).toLocaleString();

  const [showReplies, setShowReplies] = useState(false);
  const onClick = () => setShowReplies(true);

  return (
    <div style={{ border: "1px solid black", margin: "10px" }}>
      {comment.data.body && (
        <div onClick={onClick} style={{ fontWeight: "bold" }}>
          {comment.data.author} | {date}:{" "}
          <div style={{ fontWeight: "normal" }}>
            {comment.data.body} <div>{replies?.length}</div>{" "}
          </div>
        </div>
      )}
      <div>
        {showReplies
          ? replies && (
              <CommentsList CommentsComponent={Comment} comments={replies} />
            )
          : null}
      </div>
    </div>
  );
};
