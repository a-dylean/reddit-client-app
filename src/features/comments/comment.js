import React, { useState } from "react";
import { CommentsList } from "./commentsList";
import { ButtonTypography } from "../../helpers/buttonTypography";
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
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { useSelector } from "react-redux";

const CommentBox = styled(Box)(() => ({
  padding: "0 1rem",
}));

export const Comment = ({ comment }) => {
  const replies = comment.data?.replies?.data?.children;
  //const date = ;
  const [showReplies, setShowReplies] = useState(false);
  const toggleReplies = () => {
    const newShowReplies = !showReplies;
    setShowReplies(newShowReplies);
  };
  return (
    <List sx={{ borderLeft: `0.15rem inset ${grey[50]}` }}>
      <ListItemText
        disableTypography
        primary={
          comment.data.body && (
            <CommentBox
              sx={{
                cursor: replies ? "pointer" : "auto",
                width: "fit-content",
              }}
              onClick={toggleReplies}
            >
              <Typography variant="h7" gutterBottom>
                {comment.data.author} | {relativeDays(makeDate(comment.data.created_utc).getTime())}:
              </Typography>
              <Typography variant="h4">{comment.data.body}</Typography>
              <ButtonGroup
                variant="outlined"
                aria-label="outlined button group"
                size="small"
              >
                {replies?.length && (
                  <Button
                    aria-label="view replies"
                    startIcon={<ForumRoundedIcon />}
                  >
                    <ButtonTypography
                      num={replies?.length}
                      text={replies?.length > 1 ? "replies" : "reply"}
                    />
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
            </CommentBox>
          )
        }
      ></ListItemText>
      {showReplies && (
        <ListItemText
          primary={
            replies && (
              <CommentBox>
                <CommentsList CommentsComponent={Comment} comments={replies} />
              </CommentBox>
            )
          }
        />
      )}
    </List>
  );
};
