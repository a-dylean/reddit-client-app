import React, { useState, useEffect } from "react";
import { getSubreddits } from "../features/subReddits/subRedditsSlice";

export const DataFetching = () => {
    const [subreddits, setSubreddits] = useState([]);

    useEffect(() => {
        fetch("https://www.reddit.com/r/popular.json")
        .then(res => {
            res.json()
        .then(data => {
                if (data !=null) {
                    setSubreddits(data.data.children);
                }
            })
        })
    },[]);

    console.log(subreddits)

    return (
        <div>
              {subreddits.map(subreddit => (<li key={subreddit.data.id}>{subreddit.data.subreddit}</li>))}
        </div>


    )
}

