import React from "react";

export const Comment = ({ comment, children }) => {
    return (
        <div style={{ border: "1px solid black", margin: "10px"}}>
            {comment.data.body}
        </div>
    )
};