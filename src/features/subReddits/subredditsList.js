import React from 'react';
import { useSelector } from 'react-redux';
import { List, Typography, LinearProgress } from '@mui/material';
import { Subreddit } from './subreddit';

const SubredditsList = ({searchTerm}) => {
  const { subreddits, loading, rejected } = useSelector((state) => state.subreddit);

  if (loading) {
    return (
      <div>
        <Typography variant="h7">Subreddits are loading...</Typography>
        <LinearProgress/>
    </div>);
  }

  if (searchTerm && (rejected || !subreddits.length)) {
    return (
      <div>
        <Typography variant="h7">Subreddit not found!</Typography>
      </div>
    );
  }
  return (
    <List>
        {subreddits.slice(0, 20).map((subreddit) => (
          <Subreddit subreddit={subreddit} key={subreddit.data.id}/>
        ))}
     </List>
  )
}

export default SubredditsList;
