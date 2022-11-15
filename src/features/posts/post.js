import React from "react";
import { Comments } from "../comments/comments";
import { useDispatch } from "react-redux";
import { selectPost } from "../comments/commentsSlice";
import { useState } from "react";

import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  IconButton,
  Badge,
  Box,
  CardMedia,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { blue } from "@mui/material/colors";

export const Post = ({ post, children }) => {
  const unix_timestamp = post.data.created_utc;
  const date = new Date(unix_timestamp * 1000).toLocaleString();
  const image = post.data.url;
  const author_data = post.data.author;
  const subheader = "Created by " + author_data + " | " + date;
  const [commentsToggle, setCommentsToggle] = useState(false);
  const dispatch = useDispatch();

  const onClickHandler = () => {
    const newCommentsToggle = !commentsToggle;
    if (newCommentsToggle) {
      dispatch(selectPost(post.data.id));
    } else {
      dispatch(selectPost(null));
    }
    setCommentsToggle(newCommentsToggle);
  };
  return (
    <Card sx={{ maxwidth: 350, mb: 5, display: "flex", flexDirection: "row" }}>
      <Box sx={{ background: "#f5f5f5" }}>
        <IconButton aria-label="add to favorites" sx={{p: 2}}>
          <Badge badgeContent={post.data.ups} max={100} sx={{ color: "black" }}>
            <FavoriteIcon sx={{ color: "#f44336" }} />
          </Badge>
        </IconButton>
      </Box>
      <Box>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 0
        }}
      >
        <CardHeader
          title={post.data.title}
          subheader={subheader}
          sx={{
          overflowWrap: "break-word",
          wordBreak: "break-word"
          }}
        />
        <CardMedia
          component="img"
          src={image}
          alt="post image"
          height="350"
          sx={{
            objectFit: "contain",
          }}
          onError={(event) => {
            event.target.style.display = "none";
            event.onerror = null;
          }}
        />
        
        <CardActions>
          <IconButton aria-label="view comments" onClick={onClickHandler}>
            <Badge
              badgeContent={post.data.num_comments}
              max={100}
              sx={{ color: "black", wordBreak: "normal" }}>
            <ChatBubbleIcon sx={{ color: blue[400] }} />
            </Badge>
          </IconButton>
          <IconButton aria-label="share post">
            <ShareIcon sx={{ color: "black" }} />
          </IconButton>
          <IconButton aria-label="save post">
            <BookmarkBorderIcon sx={{ color: "black" }} />
          </IconButton>
          <IconButton>
            <MoreHorizIcon sx={{ color: "black" }} />
          </IconButton>
        </CardActions>
        {commentsToggle && <Comments postId={post.data.id} />}
        </CardContent>
      </Box>
    </Card>
  );
};
