import React from "react";
import { Comments } from "./Comments";

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

  return (
    <div style={{ border: "1px solid black" }}>
      <div style={{ fontWeight: "bold" }}>{post.data.title}</div>
      <div>
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
      <div>Likes: {post.data.ups}</div>
      <div>Created by {post.data.author}</div>
      <div>Created: {date}</div>
      <div>Comments: {post.data.num_comments}</div>
      <Comments />
    </div>
  );
};
