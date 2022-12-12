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
import useWindowSize from "../../components/useWindowSize";

export const Post = ({ selectedSubreddit, post, fullVersion = false }) => {
  const unix_timestamp = post.data.created_utc;
  const date = new Date(unix_timestamp * 1000).toLocaleString();
  const image = post.data.url;
  const author_data = post.data.author;
  const subheader = "Posted by " + author_data + " | " + date;
  const navigate = useNavigate();
  const onPostClick = () => {
    !fullVersion && navigate(`/r/${selectedSubreddit}/${post.data.id}`);
  };
  const size = useWindowSize();

  return (
    <>
      <Card
        sx={{
          width: "auto",
          mb: "1rem",
          display: "flex",
          flexDirection: "row",
          pb: 0,
        }}
      >
        {size.width > 600 && (
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
        )}
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
              onClick={onPostClick}
              sx={{ cursor: fullVersion ? "auto" : "pointer" }}
            >
              <CardHeader title={post.data.title} subheader={subheader} />
              <CardMedia
                component="img"
                src={image}
                alt="post image"
                height="350"
                sx={{
                  objectFit: "contain",
                  pb: "16px",
                }}
                onError={(event) => {
                  event.target.style.display = "none";
                  event.onerror = null;
                }}
              />
              {post.data.media?.reddit_video && (
                <CardMedia
                  component="video"
                  height="350"
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
                      {size.width > 600 &&
                        (post.data.num_comments === 1
                          ? " comment"
                          : " comments")}
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
