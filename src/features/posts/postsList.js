import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "./postsSlice";
import { Post } from "../posts/post";

export const Postslist = () => {
  const { posts, loading, selectedSubreddit } = useSelector(
    (state) => state.post
  );
  const searchTerm = useSelector((state) => state.search.searchTerm);
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts(selectedSubreddit));
  }, [selectedSubreddit]);

  if (loading) {
    return "Loading...";
  }

  //console.log(posts);

  return (
    <div>
      <h2>Posts</h2>
      <div>
        {posts
          .filter((post) =>
            post.data.title.toLowerCase().
            includes(searchTerm.toLowerCase())
          )
          .map((post) => (
            <Post post={post} key={post.data.id} />
          ))}
      </div>
    </div>
  );
};
