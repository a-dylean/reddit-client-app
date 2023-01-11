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


/* - takes the following props:
    - title
    - image
- onclick renders a new postlist
*/

export const Subreddit = ({ subreddit }) => {
  const thumbnail = subreddit.data.icon_img;
  const subscribers = subreddit?.data?.subscribers?.toLocaleString("en-US");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClickHandler = () => {
    dispatch(selectSubreddit(subreddit.data.url.slice(3)));
    navigate(`${subreddit.data.url}`);
  };

  return (
    <li>
      {subreddit && (<ListItemButton
        divider
        aria-label="select subreddit"
        onClick={onClickHandler}
        disableRipple
      >
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
        <ListItemText>
          <Typography variant="h4">{subreddit.data.display_name.charAt(0).toUpperCase()+subreddit.data.display_name.slice(1)}</Typography>
            <Typography
              variant="h7"
              sx={{ color: "rgba(0, 0, 0, 0.54)", whiteSpace: "nowrap", display: {xs: "none", sm: "block"} }}
            >
              {subscribers} subscribers
            </Typography>
        </ListItemText>
      </ListItemButton>)}
    </li>
  );
};
