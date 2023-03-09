import React from "react";
import { Typography, LinearProgress } from "@mui/material";

const Loading = () => {
  return (
    <>
      <Typography variant="h7">Loading...</Typography>
      <LinearProgress />
    </>
  );
};

export default Loading;