import React from "react";
import { Comments } from "../comments/comments";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
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
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";

export const Post = ({ post, fullVersion = false }) => {
  const unix_timestamp = post.data.created_utc;
  const date = new Date(unix_timestamp * 1000).toLocaleString();
  const image = post.data.url;
  const author_data = post.data.author;
  const subheader = "Posted by " + author_data + " | " + date;
  const navigate = useNavigate();

  const onPostClick = () => {
    !fullVersion && navigate(`/${post.data.id}`);
  };

  return (
    <>
      <Card
        sx={{
          maxwidth: 350,
          mb: "1rem",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            background: "#f5f5f5",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <IconButton sx={{ m: "0.3rem 0.3rem 0", p: "0.2" }}>
            <ThumbUpOffAltIcon />
          </IconButton>
          <Typography variant="h7">
            {post.data.ups > 9999 ? "10k+" : post.data.ups}
          </Typography>
          <IconButton sx={{ m: "0 0.3rem 0.3rem", p: "0.2" }}>
            <ThumbDownOffAltIcon />
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
            <Box onClick={onPostClick} sx={{ cursor: "pointer" }}>
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
              {post.data.media?.reddit_video && (
                <ReactPlayer
                  url={post.data.media.reddit_video.fallback_url}
                  hight="100%"
                  width="100%"
                  playing={true}
                  muted={true}
                  controls={true}
                />
              )}
              {post.data?.selftext && (
                <Collapse
                  in={fullVersion}
                  collapsedSize={150}
                  sx={{
                    maskImage: !fullVersion
                      ? "linear-gradient(to bottom, black, black 80%, black 20%, transparent 100%)"
                      : "none",
                  }}
                >
                  <Typography variant="h6" paragraph wrap="nowrap">
                    {post.data.selftext}
                  </Typography>
                </Collapse>
              )}

              <CardActions sx={{ p: "1rem" }}>
                <ButtonGroup
                  variant="outlined"
                  aria-label="outlined button group"
                  size="small"
                >
                  <Button aria-label="view comments">
                    <ChatBubbleIcon sx={{ pr: "0.3rem" }} />
                    <Typography variant="h7"
                    >
                      {post.data.num_comments}{" "}
                      {post.data.num_comments === 1 ? "comment" : "comments"}
                    </Typography>
                  </Button>
                  <Button aria-label="share post">
                    <ShareIcon />
                  </Button>
                  <Button aria-label="save post">
                    <BookmarkBorderIcon />
                  </Button>
                  <Button aria-label="more info">
                    <MoreHorizIcon />
                  </Button>
                </ButtonGroup>
              </CardActions>
            </Box>
            {fullVersion && <Comments postId={post.data.id} />}
          </CardContent>
        </Box>
      </Card>
    </>
  );
};
