import React from "react";
import { Comments } from "../comments/comments";
import { useDispatch, useSelector } from "react-redux";
import { selectPost, getComments } from "../comments/commentsSlice";
import { useEffect, useState } from "react";
import { selectSubreddit } from "./postsSlice";
import { getSubreddits } from "../subReddits/subRedditsSlice";

/*
it takes the following props:
    - id
    - title
    - image
    - author
    - date
    - comments
    - rating
- displays:
    - title
    - content
    - rating
    - buttons (like/dislike)
    - author of the post
    - date
    - number of comments
*/

export const Post = ({ post, children }) => {
  const unix_timestamp = post.data.created_utc;
  var date = new Date(unix_timestamp * 1000).toLocaleString();
  const image = post.data.url;
  const [commentsToggle, setCommentsToggle] = useState(false);
  const dispatch = useDispatch();

  const onClickHandler = () => {
      const newCommentsToggle = !commentsToggle;
      if (newCommentsToggle) {
        dispatch(selectPost(post.data.id));
      } else {
        dispatch(selectPost(null));
      }
      setCommentsToggle(newCommentsToggle);
  };
  
  return (
    <div style={{ border: "1px solid black", margin: "10px"}}>
      <div style={{ fontWeight: "bold", textAlign: "center" }}>{post.data.title}</div>
      <div style={{textAlign: "center"}}>
        <img
          src={image}
          id="post_image"
          alt="post image"
          style={{ height: "150px" }}
          onError={(event) => {
            event.target.style.display = "none";
            event.onerror = null;
          }}
        />
      </div>
      <div style={{display: "flex", flexDirection: "row", padding: "10px"}}>
      <div>Likes: {post.data.ups}</div>
      <div>Created by {post.data.author}</div>
      <div>Created: {date}</div>
      </div>
      <div>
        <button onClick={onClickHandler}>
          Comments: {post.data.num_comments}
        </button>
      </div>
      <div>
        { commentsToggle && <Comments postId={post.data.id} /> }
      </div>
    </div>
  );
};
