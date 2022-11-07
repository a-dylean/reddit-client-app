/* - fetches info from Reddit API
   - renders a list of Subreddits*/

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSubreddits } from "./subRedditsSlice";
import { Subreddit } from "./subreddit";

export const Subreddits = () => {
  const { subreddits, loading } = useSelector((state) => state.subreddit);
  const searchTerm = useSelector((state) => state.search.searchTerm);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSubreddits());
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <h2>Subreddits</h2>
      <div>
        {subreddits
          .slice(0, 10)
          .map((subreddit) => (
            <Subreddit subreddit={subreddit} key={subreddit.data.id} />
          ))}
      </div>
    </div>
  );
};
