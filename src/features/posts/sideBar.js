import React from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { IconButton, Typography, Box } from "@mui/material";
import { theme } from "../../components/theme";
import { styled } from "@mui/material/styles";

const ThumbIconButton = styled(IconButton)(() => ({
  padding: theme.spacing(0.5),
  margin: theme.spacing(0.5),
}));

const SideBar = ({ post }) => {
  return (
    <Box
      sx={{
        background: theme.palette.primary.sideBarGrey,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        display: { xs: "none", sm: "flex" },
      }}
    >
      <ThumbIconButton aria-label="thumb up">
        <ThumbUpOffAltIcon />
      </ThumbIconButton>
      <Typography variant="h7">
        {post.data.ups > 9999 ? "10k+" : post.data.ups}
      </Typography>
      <ThumbIconButton aria-label="thumb down">
        <ThumbDownOffAltIcon />
      </ThumbIconButton>
    </Box>
  );
};

export default SideBar;
