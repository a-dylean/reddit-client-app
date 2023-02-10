import React from "react";
import { Comments } from "../comments/comments";
import { ButtonTypography } from "../../helpers/buttonTypography";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
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
import { makeDate, relativeDays } from "../../helpers/helperFunctions";
import SideBar from "./sideBar";

export const PostItem = ({ selectedSubreddit, post, fullVersion = false }) => {
  const date = relativeDays(makeDate(post.data.created_utc).getTime());
  const navigate = useNavigate();
  const handlePostClick = () => {
    !fullVersion && navigate(`/r/${selectedSubreddit}/${post.data.id}`);
  };

  return (
    <>
      <Card
        sx={{
          width: "auto",
          display: "flex"
        }}
      >
        <SideBar post={post} />
        <CardContent
          wrap="nowrap"
          sx={{
            width: "100%",
            hight: "100%",
          }}
        >
          <Box
            onClick={handlePostClick}
            sx={{ cursor: fullVersion ? "auto" : "pointer" }}
          >
            <CardHeader
              title={post.data.title}
              subheader={`Posted by ${post.data.author} ${date}`}
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
                controls
                autoPlay
                loop
                sx={{ backgroundColor: "black" }}
              />
            )}
            {post.data.selftext.length >= 300 ? (
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
            ) : (
              <Typography variant="h6" paragraph wrap="nowrap">
                {post.data.selftext}
              </Typography>
            )}
            <CardActions>
              <ButtonGroup
                variant="outlined"
                aria-label="outlined button group"
                size="small"
              >
                <Button
                  aria-label="view comments"
                  startIcon={<ChatBubbleIcon />}
                >
                  <ButtonTypography
                    num={post.data.num_comments}
                    text={post.data.num_comments === 1 ? "comment" : "comments"}
                  />
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
      </Card>
    </>
  );
};
