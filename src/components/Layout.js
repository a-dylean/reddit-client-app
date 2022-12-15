import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Search } from "./search";
import { useNavigate } from "react-router-dom";
import useWindowSize from "./useWindowSize";
import { Subreddits } from "../features/subReddits/subReddits";

const Layout = ({ children, selectedSubreddit }) => {
  const navigate = useNavigate();
  const size = useWindowSize();
  const [showSubreddits, setShowSubreddits] = useState(false);
  const toddleSubreddits = () => {
    const newShowReplies = !showSubreddits;
    setShowSubreddits(newShowReplies);
  };

  return (
    <>
      <AppBar>
        <Toolbar sx={{justifyContent: size.width < 600 ? "space-between" : "none"}}>
          {size.width > 600 && (
            <>
              <Typography
                sx={{
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/r/${selectedSubreddit}`)}
                variant="h5"
              >
                /r/{selectedSubreddit}
              </Typography>
              <Box
                onClick={toddleSubreddits}
                sx={{ position: "relative", left: "30%" }}
              >
                <Search />
              </Box>
            </>
          )}

          {size.width < 600 && (
            <>
              <Box
                onClick={toddleSubreddits}
                sx={{right: "0px" }}
              >
                <Search />
              </Box>
              <IconButton
                size="large"
                aria-label="subreddits"
                onClick={toddleSubreddits}
                color="inherit"
              >
                <MenuIcon fontSize="large" />
              </IconButton>
              <Box
                sx={{
                  display: showSubreddits ? "block" : "none",
                  position: "absolute",
                  top: "51px",
                  left: "0px",
                  backgroundColor: "#FF4300",
                  width: "100%",
                  borderRadius: "4px",
                }}
              >
                <Subreddits toddleSubreddits={toddleSubreddits} />
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </>
  );
};

export default Layout;
