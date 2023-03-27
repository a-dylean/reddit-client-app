import React from "react";
import { Typography } from "@mui/material";
import { theme } from "../components/theme";
export const ButtonTypography = ({ num, text }) => {
  return (
    <>
      <Typography variant="h7">
        {num}
      </Typography>
      <Typography
        variant="h7"
        sx={{ display: { xs: "none", sm: "none", md: "flex" }, pl: `${theme.spacing(0.3)}` }}
      >
        {text}
      </Typography>
    </>
  );
};
