import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Card,
} from "@mui/material";
import { Search } from "./search";
import { useNavigate } from "react-router-dom";
import {useWindowSize} from "./helperFunctions";
import { Subreddits } from "../features/subReddits/subReddits";

const Layout = ({ children, selectedSubreddit }) => {
  const navigate = useNavigate();
  const size = useWindowSize();

  return (
    <>
      <AppBar >
        <Toolbar
          sx={{ display: "flex", justifyContent: size.width < 600 && "space-between" }}
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
          {size.width > 600 && (
            <Box
              sx={{ margin: "0 auto", width: "35%"}}
            >
              <Search/>
              {/* <Card
                sx={{
                  width: "34%",
                  position: "absolute",
                  top: "4rem",
                  //display: showSubreddits ? "display" : "none",
                 boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                 borderTopLeftRadius: 0,
                 borderTopRightRadius: 0
                }}
              >
                <Subreddits />
              </Card> */}
            </Box>
          )}

          {/* {size.width < 600 && (
              <><Box 
             // onClick={toddleSubreddits}
              >
                <Search />
                <Card
                sx={{
                  position: "absolute",
                  top: "3.5rem",
                  right: "1rem",
                  left: "1rem",
                  //display: showSubreddits ? "display" : "none",
                 boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                 borderTopLeftRadius: 0,
                 borderTopRightRadius: 0
                }}
              >
                <Subreddits/>
              </Card>
              </Box>
              </>
          )} */}
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </>
  );
};

export default Layout;