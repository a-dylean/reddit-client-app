import React from "react";
import { useSelector } from "react-redux";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Search } from "./search";
import { useNavigate } from "react-router-dom";

const Layout = ({ children, selectedSubreddit }) => {
  const navigate = useNavigate();
  return (
    <>
      <AppBar>
        <Toolbar
          variant="dense"
          sx={{ display: "flex", justifyContent: "space-around" }}
        >
        <Typography sx={{ color: 'white', cursor: "pointer"}} onClick={() => navigate(`/r/${selectedSubreddit}`)} variant='h5'>/r/{selectedSubreddit}</Typography>
          <Search />
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </>
  );
};

export default Layout;
