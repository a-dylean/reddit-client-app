import React from "react";
import { useSelector } from "react-redux";
import { List, Typography } from "@mui/material";
import { Subreddit } from "./subreddit";
import Loading from "../../components/loading";

const SubredditsList = ({ searchTerm }) => {
  const { subreddits, loading, rejected } = useSelector(
    (state) => state.subreddit
  );

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        searchTerm &&
        (rejected || !subreddits.length) && (
          <div>
            <Typography variant="h7">Subreddit not found!</Typography>
          </div>
        )
      )}
      <List>
        {subreddits.slice(0, 20).map((subreddit) => (
          <Subreddit subreddit={subreddit} key={subreddit.data.id} />
        ))}
      </List>
    </>
  );
};

export default SubredditsList;
