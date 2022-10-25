import React from "react";
import { Postslist } from "../posts/postsList";
import { useDispatch } from "react-redux";
import { selectSubreddit } from "./subRedditsSlice";

/* - takes the following props:
    - title
    - image
- onclick renders a new postlist
*/

export const Subreddit = ({ subreddit, children }) => {

    const thumbnail = subreddit.data.header_img;
    
    const dispatch = useDispatch();

  return (
    <div>
      <button style={{ height: "80px", width: "200px", margin: "5px" }} onClick={(e) => dispatch(selectSubreddit(e.target.value))}>
        <img
          src={thumbnail}
          alt="thumbnail"
          style={{ height: "50px", width: "50px", borderRadius: "50px" }}
          onError={event => {
            event.target.src = "https://external-preview.redd.it/iDdntscPf-nfWKqzHRGFmhVxZm4hZgaKe5oyFws-yzA.png?width=640&crop=smart&auto=webp&s=bfd318557bf2a5b3602367c9c4d9cd84d917ccd5"
            event.onerror = null
          }}
        />
        {subreddit.data.title}
      </button>
    </div>
  );
};
