import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "./postsSlice";

export const Postslist = () => {
  const { loading, selectedSubreddit } = useSelector((state) => state.post);

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
    </div>
  );
};
