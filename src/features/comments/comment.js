import React, { useState } from "react";
import { CommentsList } from "./commentsList";

import { Divider, Badge, Paper } from '@mui/material';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';

export const Comment = ({ comment }) => {
  const unix_timestamp = comment.data.created_utc;
  const replies = comment.data?.replies?.data?.children;

  var date = new Date(unix_timestamp * 1000).toLocaleString();

  const [showReplies, setShowReplies] = useState(false);
  const onClick = () => setShowReplies(true);

  return (
    <Paper>
      <Divider variant="fullWidth"/>
        {comment.data.body && ( 
          <div style={{margin: 15}}>
            <h4 style={{margin: 0}}>{comment.data.author} | {date}:</h4>
            <div>
          <p style={{margin: 5}}>{comment.data.body}</p></div>
          <Badge badgeContent={replies?.length} onClick={onClick}>
            <ForumRoundedIcon/>
          </Badge>  
      </div>)}
      {showReplies ? replies && (
              <CommentsList CommentsComponent={Comment} comments={replies} />
            )
          : null}
        <Divider variant="fullWidth"/>
    </Paper>
  );
};
