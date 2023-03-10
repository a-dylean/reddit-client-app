import React from "react";
import { Typography } from "@mui/material";

export const ButtonTypography = ({ num, text }) => {
  return (
    <>
      <Typography variant="h7">
        {num}
      </Typography>
      <Typography
        variant="h7"
        sx={{ display: { xs: "none", sm: "none", md: "flex" }, pl: "0.2rem" }}
      >
        {text}
      </Typography>
    </>
  );
};
