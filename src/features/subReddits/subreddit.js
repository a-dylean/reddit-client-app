import React from "react";
import { useDispatch } from "react-redux";
import { selectSubreddit } from "../posts/postsSlice";
import { useNavigate } from "react-router-dom";
import {
  ListItemButton,
  Avatar,
  ListItemAvatar,
  Typography,
  ListItemText,
} from "@mui/material";

export const Subreddit = ({ subreddit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!subreddit) {
    return null;
  }
  
  const defaultPic =
    "https://external-preview.redd.it/iDdntscPf-nfWKqzHRGFmhVxZm4hZgaKe5oyFws-yzA.png?width=640&crop=smart&auto=webp&s=bfd318557bf2a5b3602367c9c4d9cd84d917ccd5";
  const thumbnail = subreddit.data.icon_img;
  const subscribers = subreddit?.data?.subscribers?.toLocaleString("en-US");

  const onClickHandler = () => {
    dispatch(selectSubreddit(subreddit.data.url.slice(3)));
    navigate(`${subreddit.data.url}`);
  };
  const formatSubredditName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <ListItemButton
      divider
      aria-label="select subreddit"
      onClick={onClickHandler}
      disableRipple
    >
      <ListItemAvatar>
        <Avatar
          src={thumbnail || defaultPic}
          alt="thumbnail"
          onError={(event) => {
            event.target.style.display = "none";
            event.onerror = null;
          }}
        />
      </ListItemAvatar>
      <ListItemText>
        <Typography variant="h5">
          {formatSubredditName(subreddit.data.display_name)}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            whiteSpace: "nowrap",
            display: { xs: "none", sm: "block" },
          }}
        >
          {subscribers} subscribers
        </Typography>
      </ListItemText>
    </ListItemButton>
  );
};
