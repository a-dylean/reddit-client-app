import React from "react";
import { Postslist } from "../posts/postsList";

/* - takes the following props:
    - title
    - image
- onclick renders a new postlist
*/

export const Subreddit = ({ subreddit, children }) => {
  const handleClick = () => {};

  return (
    <div>
      <button style={{ height: "80px", width: "200px" }} onClick={handleClick}>
        <img
          src={subreddit.data.thumbnail}
          onError={() => console.log(this)}
          alt="thumbnail"
          style={{ height: "50px", width: "50px", borderRadius: "50px" }}
        />
        {subreddit.data.subreddit}
      </button>
    </div>
  );
};
