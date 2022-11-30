import React from "react";
import { useDispatch } from "react-redux";
import { selectSubreddit } from "../posts/postsSlice";
import { setPageNumber, setPagesVisitedToZero } from "../../app/pageSlice";

import {
  ListItemButton,
  Avatar,
  ListItemAvatar,
  Typography,
} from "@mui/material";

/* - takes the following props:
    - title
    - image
- onclick renders a new postlist
*/

export const Subreddit = ({ subreddit, children }) => {
  const thumbnail = subreddit.data.header_img;
  const dispatch = useDispatch();

  const onClickHandler = () => {
    dispatch(selectSubreddit(subreddit.data.url));
    dispatch(setPageNumber(1));
    dispatch(setPagesVisitedToZero());
  };

  return (
    <ListItemButton onClick={onClickHandler} >
      <ListItemAvatar minwidth={150}>
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
      <Typography variant="h7">
        {subreddit.data.title}
      </Typography>
    </ListItemButton>
  );
};
