import React from "react";
import { CommentsList } from "./commentsList";

export const Comment = ({comment}) => {
  const unix_timestamp = comment.data.created_utc;
  const replies = comment.data?.replies?.data?.children;

  var date = new Date(unix_timestamp * 1000).toLocaleString();
  return (
    <div style={{ border: "1px solid black", margin: "10px" }}>
      {comment.data.body &&
        <div style={{ fontWeight: "bold" }}>{comment.data.author} | {date}: <div style={{ fontWeight: "normal"}}>{comment.data.body}</div>
      </div>}
      <div>
        { replies && <CommentsList CommentsComponent={Comment} comments={replies} />}
      </div>
    </div>
  );
};

// export const Comment = (props) => {
//   return (
//     <div>
//       <div>{props.fetchedcomments.map((comment) => {return <div style={{border: "1px solid black"}}>{comment}</div>})}</div>

//       <div >{props.fetchedreplies.map((reply) => {return <div style={{border: "1px solid red"}}>{reply}</div>})}</div>
      
//     </div>
//   )
// }

// export const Comment = ({comments, replies}) => {
//   const commentIds = comments.map((item) => item.data.name);
//   const commentBodies = comments.map((item) => item.data.body);
//   const replyIds = replies.map((item) => item.data.parent_id);
//   const replyBodies = replies.map((item) => item.data.body);




//   console.log(commentIds);
//   console.log(replyIds);
//   return (
    
//     <div>
//     <div>
//       {commentBodies.map((item, id) => {return <ul key={id}>{item}<Reply replies={replies}/></ul>})}
//     </div>
//     {/* <div style={{border: "1px solid red"}}>{replyBodies.map((item) => {return <ul key={item.id}>{item}</ul>} )}</div>
//      */}

    
//     </div>
//   )
// }