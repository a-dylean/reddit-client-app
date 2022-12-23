import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Search } from "./search";
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "./helperFunctions";

const Layout = ({ children, selectedSubreddit }) => {
  const navigate = useNavigate();
  const size = useWindowSize();

  return (
    <>
      <AppBar>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: size.width < 600 && "space-between",
          }}
        >
          <Typography
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
            <Search />
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </>
  );
};

export default Layout;
