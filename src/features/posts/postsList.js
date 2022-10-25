import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "./postsSlice";
import { Post } from "../posts/post";

export const Postslist = () => {
  const { posts, loading } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, []);

  if (loading) {
    return "Loading...";
  }

  console.log(posts);

  return (
    <div>
      <h2>Posts</h2>
      <div>
        {posts.map((post) => (
          <Post post={post} key={post.data.id} />
        ))}
      </div>
    </div>
  );
};
