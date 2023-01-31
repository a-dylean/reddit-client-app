import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";
import { Search } from "./search";
import { useNavigate } from "react-router-dom";

const Layout = ({ children, selectedSubreddit }) => {
  const navigate = useNavigate();

  const [displaySelectedSubreddit, setDisplaySelectedSubreddit] =
    useState(true);

  const onFocusChange = (value) => {
    setDisplaySelectedSubreddit(value);
  };

  return (
    <>
      <AppBar>
        <Toolbar variant="dense">
          <Typography
            sx={{ display: displaySelectedSubreddit ? "block" : "none" }}
            variant="h3"
            id="selectedSubreddit"
            noWrap
            onClick={() => navigate(`/r/${selectedSubreddit}`)}
          >
            /r/{selectedSubreddit}
          </Typography>
          <Search onFocusChange={onFocusChange} />
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: "4rem" }}>
        <main>{children}</main>
      </Container>
    </>
  );
};

export default Layout;
