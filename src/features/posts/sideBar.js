import React from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { IconButton, Typography, Box } from "@mui/material";
import { grey } from "@mui/material/colors";
const SideBar = ({ post, theme }) => {
  return (
    <Box
      sx={{
        background: grey[100],
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        display: { xs: "none", sm: "flex" },
      }}
    >
      <IconButton
        aria-label="thumb up"
        sx={{ m: "0.3rem 0.3rem 0", p: "0.3rem" }}
      >
        <ThumbUpOffAltIcon />
      </IconButton>
      <Typography variant="h7">
        {post.data.ups > 9999 ? "10k+" : post.data.ups}
      </Typography>
      <IconButton
        aria-label="thumb down"
        sx={{ m: "0 0.3rem 0.3rem", p: "0.3rem" }}
      >
        <ThumbDownOffAltIcon />
      </IconButton>
    </Box>
  );
};

export default SideBar;