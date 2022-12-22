import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Box, Card } from "@mui/material";
import { Search } from "./search";
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "./helperFunctions";
import FeaturedSubreddits from "../features/subReddits/featuredSubreddits";

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
          
          {/* <Box sx={{ margin: "0 auto", width: "35%" }}> */}
            <Search />
          {/* </Box> */}

          {/* {size.width < 600 && (
              <><Box 
              >
                <Search />
                <Card
                sx={{
                  position: "absolute",
                  top: "3.5rem",
                  right: "1rem",
                  left: "1rem",
                 boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                 borderTopLeftRadius: 0,
                 borderTopRightRadius: 0
                }}
              >
                <FeaturedSubreddits/>
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
