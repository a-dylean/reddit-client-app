import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "./postsSlice";
import { Post } from "../posts/post";

export const Postslist = () => {
  const { posts, loading, selectedSubreddit } = useSelector(
    (state) => state.post
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts(selectedSubreddit));
  }, [selectedSubreddit]);

  if (loading) {
    return "Loading...";
  }

  return (
    <div>
      <h2>{selectedSubreddit}</h2>
      <div>
        {/* {
          // .map((post) => (
          //   <Post post={post} key={post.data.id} />
          // ))} */}
      </div>
    </div>
  );
};
