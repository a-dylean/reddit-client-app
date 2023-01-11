import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Search } from "./search";
import { useNavigate } from "react-router-dom";

const Layout = ({ children, selectedSubreddit }) => {
  const navigate = useNavigate();

  const hideSudreddit = () => {
    document.getElementById("selectedSubreddit").style.display = "none";
  };

  const showSubreddit = () => {
    document.getElementById("selectedSubreddit").style.display = "block";
  };

  return (
    <>
      <AppBar>
        <Toolbar variant="dense">
          <Typography
            id="selectedSubreddit"
            sx={{
              color: "white",
              cursor: "pointer",
            }}
            noWrap
            onClick={() => navigate(`/r/${selectedSubreddit}`)}
            variant="h3"
          >
            /r/{selectedSubreddit}
          </Typography>
          <Search hideSudreddit={hideSudreddit} showSubreddit={showSubreddit}/>
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </>
  );
};

export default Layout;
