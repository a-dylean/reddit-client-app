import React from "react";
import { Comments } from "../comments/comments";
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
import { relativeDays } from "../../components/helperFunctions";

export const Post = ({ selectedSubreddit, post, fullVersion = false }) => {
  const date = new Date(post.data.created_utc * 1000);
  const navigate = useNavigate();
  const handlePostClick = () => {
    !fullVersion && navigate(`/r/${selectedSubreddit}/${post.data.id}`);
  };

  return (
    <>
      <Card
        sx={{
          width: "auto",
          mb: "1rem",
          display: "flex",
          pb: 0,
        }}
      >
        <Box
          sx={{
            background: "#f5f5f5",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            display: { xs: "none", sm: "flex" },
          }}
        >
          <IconButton
            aria-label="thumb up"
            sx={{ m: "0.3rem 0.3rem 0", p: "0.3rem" }}
          >
            <ThumbUpOffAltIcon />
          </IconButton>
          <Typography variant="h7">
            {post.data.ups > 9999 ? "10k+" : post.data.ups}
          </Typography>
          <IconButton
            aria-label="thumb down"
            sx={{ m: "0 0.3rem 0.3rem", p: "0.3rem" }}
          >
            <ThumbDownOffAltIcon />
          </IconButton>
        </Box>
        <Box
          wrap="nowrap"
          sx={{
            hight: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            pb: 0,
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 0,
            }}
          >
            <Box
              onClick={handlePostClick}
              sx={{ cursor: fullVersion ? "auto" : "pointer" }}
            >
              <CardHeader
              sx={{pb: "0.5rem"}}
                title={post.data.title}
                subheader={`Posted by ${post.data.author} ${relativeDays(
                  date.getTime()
                )}`}
              />
              <CardMedia
                component="img"
                src={post.data.url}
                alt="post image"
                height="400rem"
                sx={{
                  objectFit: "contain",
                }}
                onError={(event) => {
                  event.target.style.display = "none";
                  event.onerror = null;
                }}
              />
              {post.data.media?.reddit_video && (
                <CardMedia
                  component="video"
                  height="500rem"
                  src={post.data.media.reddit_video.fallback_url}
                  preload="auto"
                  controls={true}
                  autoPlay={true}
                  loop={true}
                  sx={{ backgroundColor: "black" }}
                />
              )}
              {post.data.selftext.length >= 300 && (
                <Collapse
                  in={fullVersion}
                  collapsedSize={110}
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
              {post.data.selftext.length < 300 && (
                <Typography variant="h6" paragraph wrap="nowrap">
                  {post.data.selftext}
                </Typography>
              )}
              <CardActions sx={{ p: "1rem" }}>
                <ButtonGroup
                  variant="outlined"
                  aria-label="outlined button group"
                  size="small"
                >
                  <Button aria-label="view comments">
                    <ChatBubbleIcon sx={{ pr: "0.3rem" }} />
                    <Typography variant="h7">
                      {post.data.num_comments}
                    </Typography>
                    <Typography
                      variant="h7"
                      sx={{ display: { xs: "none", sm: "flex" }, p: "0.2rem" }}
                    >
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
