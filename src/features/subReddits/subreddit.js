import React from "react";

/* - takes the following props:
    - title
    - image
- onclick renders a new postlist
*/

export const Subreddit = (props) => {
    const subreddits = props.subreddits;
    return (
        <div>
            {Object.values(subreddits).map((subreddit) => (
                <div key={subreddit.id}>
                <h2>{subreddit.id}|{subreddit.title}</h2>
                <h2>{subreddit.image}</h2>
                </div>
            ))}
            
        </div>
    )
}