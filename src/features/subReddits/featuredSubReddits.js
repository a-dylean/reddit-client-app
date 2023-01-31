import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSubreddits } from "./subRedditsSlice";
import { Subreddit } from "./subreddit";
import { Card, List, ListSubheader } from "@mui/material";
import Loading from "../../components/loading";

export const FeaturedSubreddits = () => {
  const { featuredSubreddits, featuredSubredditsLoading: loading } =
    useSelector((state) => state.subreddit);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSubreddits());
  }, [dispatch]);

  return (
    <>
      <Card>
        <ListSubheader>FEATURED SUBREDDITS</ListSubheader>
        <List>
          {featuredSubreddits.slice(0, 10).map((subreddit) => (
            <Subreddit subreddit={subreddit} key={subreddit.data.id} />
          ))}
        </List>
        {loading && <Loading />}
      </Card>
    </>
  );
};
