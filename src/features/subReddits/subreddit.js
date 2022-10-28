import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, selectSubreddit } from "../posts/postsSlice";

/* - takes the following props:
    - title
    - image
- onclick renders a new postlist
*/

export const Subreddit = ({ subreddit, children }) => {
  const thumbnail = subreddit.data.header_img;

  const dispatch = useDispatch();

  const onClickHandler = () => {
    dispatch(selectSubreddit(subreddit.data.url))
}

  return (
    <div>
      <button
        style={{ width: "200px", margin: "5px" }}
        onClick={onClickHandler}
      >
        <img
          src={
            thumbnail ||
            "https://external-preview.redd.it/iDdntscPf-nfWKqzHRGFmhVxZm4hZgaKe5oyFws-yzA.png?width=640&crop=smart&auto=webp&s=bfd318557bf2a5b3602367c9c4d9cd84d917ccd5"
          }
          alt="thumbnail"
          style={{ height: "50px", borderRadius: "50px" }}
          onError={(event) => {
            event.target.style.display = "none";
            event.onerror = null;
          }}
        />
        <div style={{ fontWeight: "bold" }}>{subreddit.data.title}</div>
      </button>
    </div>
  );
};
