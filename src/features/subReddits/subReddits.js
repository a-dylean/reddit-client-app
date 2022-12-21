/* - fetches info from Reddit API
   - renders a list of Subreddits*/

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSubreddits } from "./subRedditsSlice";
import { Subreddit } from "./subreddit";
import { List, Typography, LinearProgress, ListSubheader } from "@mui/material";
import { useWindowSize } from "../../components/helperFunctions";
import SubredditInfo from "./subredditInfo";

export const Subreddits = ({toddleSubreddits}) => {
  const { subreddits, loading, rejected } = useSelector((state) => state.subreddit);
  const size = useWindowSize();
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
        { size.width > 600 && <ListSubheader>FEATURED SUBREDDITS</ListSubheader>}
        {subreddits.slice(0, 10).map((subreddit) => (
          <Subreddit subreddit={subreddit} key={subreddit.data.id} toddleSubreddits={toddleSubreddits}/>
        ))}
     </List>
  );
};
