import React, { useState } from "react";
import { CommentsList } from "./commentsList";

import { Divider, Badge, Box, Typography, IconButton } from "@mui/material";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import ReplyIcon from "@mui/icons-material/Reply";

export const Comment = ({ comment }) => {
  const unix_timestamp = comment.data.created_utc;
  const replies = comment.data?.replies?.data?.children;
  const date = new Date(unix_timestamp * 1000).toLocaleString();

  const [showReplies, setShowReplies] = useState(false);
  const onClick = () => {
    const newShowReplies = !showReplies;
    setShowReplies(newShowReplies);
  };

  const classes = {
    focused: {
      bgcolor: "transparent",
    },
    selected: {
      bgcolor: "transparent",
    },
  };

  return (
    <TreeView
      sx={{
        ".MuiTreeItem-root": {
          ".Mui-focused:not(.Mui-selected)": classes.focused,
          ".Mui-selected, .Mui-focused.Mui-selected, .Mui-selected:hover, .Mui-selected::selection":
            classes.selected,
        },
      }}
    >
      <TreeItem
        key={comment.data.id}
        nodeId={comment.data.id ? comment.data.id : "defaultNodeId"}
        label={
          comment.data.body && (
            <Box sx={{ mr: 3 }}>
              <Box onClick={onClick}>
                <Typography variant="h7" gutterBottom={true}>
                  {comment.data.author} | {date}:
                </Typography>

                <Typography variant="h6" sx={{ p: 0 }}>
                  {comment.data.body}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                {replies?.length && (
                  <>
                    <ForumRoundedIcon color="action" sx={{ pr: "0.3rem"}} />
                    <Typography variant="h7">
                      {replies?.length}
                      {replies?.length > 1 ? " replies" : " reply"}
                    </Typography>
                  </>
                )}
                <IconButton aria-label="ups">
                  <NorthIcon />
                </IconButton>
                <Typography variant="h7">{comment.data.ups}</Typography>
                <IconButton aria-label="down">
                  <SouthIcon />
                </IconButton>
                <IconButton aria-label="reply">
                  <ReplyIcon />
                </IconButton>
              </Box>
              <Divider />
            </Box>
          )
        }
      ></TreeItem>
      {showReplies ? (
        <TreeItem
          nodeId={comment.data.id ? comment.data.id : "defaultNodeId"}
          label={
            replies && (
              <Box sx={{ mr: 3 }}>
                <CommentsList CommentsComponent={Comment} comments={replies} />
              </Box>
            )
          }
        />
      ) : (
        ""
      )}
    </TreeView>
  );
};
