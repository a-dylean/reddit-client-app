/* - fetches info from Reddit API
   - renders a list of Subreddits*/

import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getSubreddits } from "./subRedditsSlice";
import { Subreddit } from "./subreddit";



export const Subreddits = () => {

    const { subreddits, loading } = useSelector((state) => state.subreddit);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSubreddits());
    }, []);

    if (loading) {
        return "Loading..."
    }

  console.log(subreddits)

//   const subredditIds = subreddits.map(item => item.data.id);
//   const subredditThumbnails = subreddits.map(item => item.data.thumbnail);
//   const subredditTitles = subreddits.map(item => item.data.subreddit);

  //console.log(subredditTitle)
    return (
        <div className="ui segment">
           <h2>Subreddits</h2> 
            {/* {subreddits.map(item => (<li key={item.data.id}><img src="{item.data.thumbnail}" alt="thumbnail"/> {item.data.subreddit}</li>))} */}
            { subreddits.map((subreddit) => (
                // <Subreddit subredditTitle={subreddit.data.subreddit} key={subreddit.data.subreddit_id} subredditThumbnail={subreddit.data.subreddit} />
                <Subreddit subreddit={subreddit} key={subreddit.data.subreddit_id} />
            ))}
        </div>
    )

};

