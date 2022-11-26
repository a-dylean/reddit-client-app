import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "./postsSlice";

import { Typography, LinearProgress } from "@mui/material";

export const Postslist = (props) => {
  const { loading, selectedSubreddit } = useSelector((state) => state.post);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts(selectedSubreddit));
  }, [selectedSubreddit, dispatch]);

  if (loading) {
    return (
      <div>
        <Typography>Posts are loading...</Typography>
        <LinearProgress />
    </div>);
  }

  return (
    <Typography variant="h4" sx={{ fontWeight: "bold", pb: 1, fontFamily: "Verdana"}}>{selectedSubreddit}</Typography>
  );
};
