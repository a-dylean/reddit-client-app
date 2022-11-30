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

  return (
    <Typography variant="h5" sx={{width: "30%"}}>{selectedSubreddit}</Typography>
  );
};
