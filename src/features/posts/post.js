import React from "react";
import { Comments } from "../comments/comments";
import { useDispatch } from "react-redux";
import { selectPost } from "../comments/commentsSlice";
import { useState } from "react";

import { Card, CardActions, CardHeader, CardContent, IconButton, Badge, Paper, Box, CardMedia } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import {blue} from '@mui/material/colors';

export const Post = ({ post, children }) => {
  const unix_timestamp = post.data.created_utc;
  const date = new Date(unix_timestamp * 1000).toLocaleString();
  const image = post.data.url;
  const author_data = post.data.author;
  const subheader = 'Created by ' + author_data + ' | ' + date;
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
    <Card sx={{ maxwidth: 350, mb: 5}}>
      <CardHeader 
      title={post.data.title}
      subheader={subheader} />
      <CardMedia display="flex" justifyContent='center' alignItems='center'>
      <Box
        component='img'
        src={image}
        alt="post image"
        sx={{
          height: 300,
          display: "flex",
          justifyContent: "center",
          alignItems: 'center',

        }}
        onError={(event) => {
            event.target.style.display = "none";
            event.onerror = null;
        }}
      />
      </CardMedia>
      <CardContent style={{
          display: "flex",
          justifyContent: "center",
          alignItems: 'center'
        }}>
        <CardActions>
        <IconButton aria-label="add to favorites">
          <Badge badgeContent={post.data.ups} max={100} sx={{color: 'black'}}>
          <FavoriteIcon sx={{color: '#f44336'}}/>
          </Badge>
        </IconButton>
        <IconButton aria-label="view comments" onClick={onClickHandler}>
        <Badge badgeContent={post.data.num_comments} max={100} sx={{color: 'black'}}>
          <ChatBubbleIcon sx={{color: blue[400]}}/>
          </Badge>
        </IconButton>
                <IconButton aria-label="share">
          <ShareIcon sx={{color: 'black'}}/>
        </IconButton>
        </CardActions>
      </CardContent>
      <Paper>
        {commentsToggle && <Comments postId={post.data.id} />}
      </Paper>
    </Card>
  );
};
