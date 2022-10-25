import React from "react";

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
    const utcDate = post.data.created_utc;
    return (
        <div style={{ border: "1px solid black"}}>
        <div>
            {post.data.title}
        </div>
        <div>
            {post.data.ups}
        </div>
        <div>
            {post.data.author}
        </div>
        <div>
            Created: {utcDate}
        </div>
        <div>
            {post.data.num_comments}
        </div>
        </div>
    )
};
