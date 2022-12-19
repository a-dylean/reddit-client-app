import React, { useState } from "react";
import { CommentsList } from "./commentsList";
import {
  Divider,
  Box,
  Typography,
  IconButton,
  List,
  ListItemText,
} from "@mui/material";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import ReplyIcon from "@mui/icons-material/Reply";
import { relativeDays } from "../../components/helperFunctions";
export const Comment = ({ comment }) => {
  const replies = comment.data?.replies?.data?.children;
  const date = new Date(comment.data.created_utc * 1000);
  const [showReplies, setShowReplies] = useState(false);
  const toddleReplies = () => {
    const newShowReplies = !showReplies;
    setShowReplies(newShowReplies);
  };

  return (
    <List sx={{ borderLeft: "0.15rem inset #edeff1" }}>
      <ListItemText
        primary={
          comment.data.body && (
            <Box
              sx={{
                cursor: replies ? "pointer" : "auto",
                p: "0 1rem",
                width: "fit-content",
              }}
              onClick={toddleReplies}
            >
              <Box sx={{ width: "max-content" }}>
                <Typography variant="h7" gutterBottom={true}>
                  {comment.data.author} | {relativeDays(date.getTime())}:
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ p: 0 }}>
                {comment.data.body}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "max-content",
                }}
              >
                {replies?.length && (
                  <>
                    <ForumRoundedIcon color="action" sx={{ pr: "0.3rem" }} />
                    <Typography variant="h7">
                      {replies?.length}
                      {replies?.length > 1 ? " replies" : " reply"}
                    </Typography>
                  </>
                )}
                <Box onClick={(event) => event.stopPropagation()}>
                  <IconButton aria-label="rate up">
                    <NorthIcon />
                  </IconButton>
                  <Typography variant="h7">{comment.data.ups}</Typography>
                  <IconButton aria-label="rate down">
                    <SouthIcon />
                  </IconButton>
                  <IconButton aria-label="reply">
                    <ReplyIcon />
                  </IconButton>
                </Box>
                <Divider />
              </Box>
            </Box>
          )
        }
      ></ListItemText>
      {showReplies ? (
        <ListItemText
          sx={{ p: "0 1rem" }}
          inset={true}
          primary={
            replies && (
              <Box sx={{ width: "100%" }}>
                <CommentsList CommentsComponent={Comment} comments={replies} />
              </Box>
            )
          }
        />
      ) : (
        ""
      )}
    </List>
  );
};
