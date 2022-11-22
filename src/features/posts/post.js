import React from "react";
import { Comments } from "../comments/comments";
import { useDispatch } from "react-redux";
import { selectPost } from "../comments/commentsSlice";
import { useState } from "react";
import ReactPlayer from 'react-player';

import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  IconButton,
  Button,
  ButtonGroup,
  Box,
  CardMedia,
  Typography,
  Collapse,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

export const Post = ({ post }) => {
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

  const [expanded, setExpanded] = useState(false);
  const handleChange = () => {
    setExpanded((prev) => !prev);
  };

  const buttonUp = {
    "&:hover": {
      color: "#f44336"
    }
  };

  const buttonDown = {
    "&:hover": {
      color: "#3f51b5"
    }
  };

  const button = {
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
      border: "none"
    },
    color: "black",
    border: "none"
  }

  const link = post.data.media?.reddit_video?.scrubber_media_url;
  console.log(link)
  return (
    <Card sx={{ maxwidth: 350, mb: 5, display: "flex", flexDirection: "row" }}>
      <Box sx={{ background: "#f5f5f5", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center" }}>
        <IconButton > 
          <ThumbUpOffAltIcon sx={buttonUp} />
        </IconButton>
        <Typography sx={{fontWeight: "bold", fontSize: "10px"}}>{post.data.ups}</Typography>
        <IconButton>
          <ThumbDownOffAltIcon sx={buttonDown}/>
        </IconButton>
      </Box>
      <Box
        wrap="nowrap"
        sx={{ width: "100%", display: "flex", flexDirection: "column" }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 0,
          }}
        >
          <CardHeader title={post.data.title} subheader={subheader} />
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
          {post.data.media?.reddit_video && (<ReactPlayer
          url={post.data.media?.reddit_video?.fallback_url}
          hight="100%"
          width="100%"
          playing={true}
          muted={true}
          controls={true}
          />)}
          {post.data?.selftext && (
            <Collapse
              in={expanded}
              collapsedSize={200}
              sx={{
                maskImage: !expanded
                  ? "linear-gradient(to bottom, black, black 80%, black 20%, transparent 100%)"
                  : "none",
              }}
            >
              <Typography
                onClick={handleChange}
                sx={{ p: "16px", width: "100%" }}
                paragraph
                wrap="nowrap"
              >
                {post.data.selftext}
              </Typography>
            </Collapse>
          )}
          <CardActions>
          <ButtonGroup variant="outlined" aria-label="outlined button group" sx={button}>
            <Button aria-label="view comments" onClick={onClickHandler} sx={button}>
                <ChatBubbleIcon />
            <Typography>{post.data.num_comments} {(post.data.num_comments === 1) ? "comment" : "comments"}</Typography>
            </Button>
            <Button aria-label="share post"sx={button} >
              <ShareIcon />
            </Button>
            <Button aria-label="save post" sx={button}>
              <BookmarkBorderIcon />
            </Button>
            <Button aria-label="more info" sx={button}>
              <MoreHorizIcon />
            </Button>
            </ButtonGroup>
          </CardActions>
          {commentsToggle && <Comments postId={post.data.id} />}
        </CardContent>
      </Box>
    </Card>
  );
};
