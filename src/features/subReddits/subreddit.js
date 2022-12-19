import React from "react";
import { useDispatch } from "react-redux";
import { selectSubreddit } from "../posts/postsSlice";
import { useNavigate } from "react-router-dom";
import {
  ListItemButton,
  Avatar,
  ListItemAvatar,
  Typography
} from "@mui/material";

/* - takes the following props:
    - title
    - image
- onclick renders a new postlist
*/

export const Subreddit = ({ subreddit, toddleSubreddits }) => {
  const thumbnail = subreddit.data.header_img;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClickHandler = () => {
    dispatch(selectSubreddit(subreddit.data.url.slice(3)));
    navigate(`${subreddit.data.url}`)
    toddleSubreddits();
  };

  return (
    <li>
      <ListItemButton aria-label="select subreddit" onClick={onClickHandler} disableRipple>
      <ListItemAvatar minwidth={"150rem"}>
        <Avatar
          src={
            thumbnail ||
            "https://external-preview.redd.it/iDdntscPf-nfWKqzHRGFmhVxZm4hZgaKe5oyFws-yzA.png?width=640&crop=smart&auto=webp&s=bfd318557bf2a5b3602367c9c4d9cd84d917ccd5"
          }
          alt="thumbnail"
          onError={(event) => {
            event.target.style.display = "none";
            event.onerror = null;
          }}
        />
      </ListItemAvatar>   
      <Typography variant="h4">
        {subreddit.data.title}
      </Typography> 
    </ListItemButton>
    </li>
  );
};
