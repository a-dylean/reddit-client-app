import React from 'react';

export const CommentsList = ({
    CommentsComponent,
    comments,
}) => (
    <>
        {comments.map((comment) => (
            <CommentsComponent comment={comment} key={comment.data.id} />
        ))}
    </> 
)