/* - fetches info from Reddit API
   - renders a list of Subreddits*/

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSubreddits } from "./subRedditsSlice";
import { Subreddit } from "./subreddit";
import { List, Typography, LinearProgress } from "@mui/material";

export const Subreddits = ({toddleSubreddits}) => {
  const { subreddits, loading, rejected } = useSelector((state) => state.subreddit);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSubreddits());
  }, [dispatch]);

  if (loading) {
    return (
      <div>
        <Typography variant="h7">Subreddits are loading...</Typography>
        <LinearProgress/>
    </div>);
  }

  return (
      <List>
        {subreddits.slice(0, 10).map((subreddit) => (
          <Subreddit subreddit={subreddit} key={subreddit.data.id} toddleSubreddits={toddleSubreddits}/>
        ))}
     </List>
  );
};
