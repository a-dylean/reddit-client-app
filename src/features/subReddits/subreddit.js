import React from "react";

/* - takes the following props:
    - title
    - image
- onclick renders a new postlist
*/

export const Subreddit = ({ subreddit, children}) => {
    return (
        <div>
            <button style={{height: "80px", width: "200px"}}><img src={(subreddit.data.thumbnail) ? subreddit.data.thumbnail : "https://external-preview.redd.it/iDdntscPf-nfWKqzHRGFmhVxZm4hZgaKe5oyFws-yzA.png?width=640&crop=smart&auto=webp&s=bfd318557bf2a5b3602367c9c4d9cd84d917ccd5"} alt="thumbnail" style={{height: "50px", width: "50px", borderRadius: "50px"}}/> {subreddit.data.subreddit}</button>
            
        </div>
    )
}