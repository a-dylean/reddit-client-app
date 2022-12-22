import React from 'react';
import { useSelector } from 'react-redux';
import { List, Typography, LinearProgress } from '@mui/material';
import { Subreddit } from './subreddit';

function FeaturedSubreddits() {
  const { featuredSubreddits, loading, rejected } = useSelector((state) => state.subreddit);

  if (loading) {
    return (
      <div>
        <Typography variant="h7">Subreddits are loading...</Typography>
        <LinearProgress/>
    </div>);
  }

  if (rejected || !featuredSubreddits.length) {
    return (
      <div>
        <Typography variant="h7">Subreddit not found!</Typography>
      </div>
    );
  }
  return (
    <List>
        {featuredSubreddits.slice(0, 20).map((subreddit) => (
          <Subreddit subreddit={subreddit} key={subreddit.data.id}/>
        ))}
     </List>
  )
}

export default FeaturedSubreddits;
