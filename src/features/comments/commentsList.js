import React from 'react';

export const CommentsList = ({
    CommentsComponent,
    comments,
}) => (
    <React.Fragment>
        {comments.map((comment) => (
            <CommentsComponent comment={comment} key={comment.data.id} />
        ))}
    </React.Fragment> 
)