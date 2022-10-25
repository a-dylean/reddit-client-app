/* - fetches info from Reddit API
   - renders a list of Subreddits*/

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSubreddits } from "./subRedditsSlice";
import { Subreddit } from "./subreddit";

export const Subreddits = () => {
  const { subreddits, loading } = useSelector((state) => state.subreddit);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSubreddits());
  }, []);

  if (loading) {
    return "Loading...";
  }

  //console.log(subreddits);

  return (
    <div>
      <h2>Subreddits</h2>
      <div>
      {subreddits.map((subreddit) => (
        <Subreddit subreddit={subreddit} key={subreddit.data.id} />
      ))}
      </div>
    </div>
  );
};
