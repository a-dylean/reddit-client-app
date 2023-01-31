import React, { useState } from "react";
import { CommentsList } from "./commentsList";
import {
  Box,
  Typography,
  List,
  ListItemText,
  ButtonGroup,
  Button,
} from "@mui/material";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import ReplyIcon from "@mui/icons-material/Reply";
import { makeDate, relativeDays } from "../../helpers/helperFunctions";

export const Comment = ({ comment }) => {
  const replies = comment.data?.replies?.data?.children;
  const date = relativeDays(makeDate(comment.data?.created_utc).getTime());
  const [showReplies, setShowReplies] = useState(false);
  const toggleReplies = () => {
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
              onClick={toggleReplies}
            >
              <Box sx={{ width: "max-content" }}>
                <Typography variant="h7" gutterBottom>
                  {comment.data.author} | {date}:
                </Typography>
              </Box>
              <Typography variant="h5">{comment.data.body}</Typography>
              <ButtonGroup
                variant="outlined"
                aria-label="outlined button group"
                size="small"
              >
                {replies?.length && (
                  <Button aria-label="view replies">
                    <ForumRoundedIcon sx={{ pr: "0.3rem" }} />
                    <Typography variant="h7">{replies?.length}</Typography>
                    <Typography
                      variant="h7"
                      sx={{ display: { xs: "none", sm: "flex" }, p: "0.2rem" }}
                    >
                      {replies?.length > 1 ? "replies" : "reply"}
                    </Typography>
                  </Button>
                )}
                <Button
                  aria-label="rate up"
                  onClick={(event) => event.stopPropagation()}
                >
                  <NorthIcon />
                </Button>
                <Button
                  onClick={(event) => event.stopPropagation()}
                  aria-label="rating"
                >
                  <Typography variant="h7">{comment.data.ups}</Typography>
                </Button>
                <Button
                  aria-label="rate down"
                  onClick={(event) => event.stopPropagation()}
                >
                  <SouthIcon />
                </Button>
                <Button
                  aria-label="reply"
                  onClick={(event) => event.stopPropagation()}
                >
                  <ReplyIcon />
                </Button>
              </ButtonGroup>
            </Box>
          )
        }
      ></ListItemText>
      {showReplies && (
        <ListItemText
          sx={{ p: "0 1rem" }}
          inset
          primary={
            replies && (
              <Box sx={{ width: "100%" }}>
                <CommentsList CommentsComponent={Comment} comments={replies} />
              </Box>
            )
          }
        />
      )}
    </List>
  );
};
