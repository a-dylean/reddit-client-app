/* - fetches info from Reddit API
   - renders a list of Subreddits*/

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSubreddits } from "./subRedditsSlice";
import { Subreddit } from "./subreddit";
import { getPosts } from "../posts/postsSlice";


import { List, Typography, LinearProgress } from "@mui/material";

export const Subreddits = () => {
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

  if (rejected || !subreddits.length) {
    return (
      <div>
        <Typography variant="h7">Subreddit not found!</Typography>
      </div>
    );

  }

  return (
      <List>
        {subreddits.slice(0, 10).map((subreddit) => (
          <Subreddit subreddit={subreddit} key={subreddit.data.id} />
        ))}
     </List>
  );
};
