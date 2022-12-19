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
  const [showSubreddits, setShowSubreddits] = useState(false);
  const toddleSubreddits = () => {
    const newShowReplies = !showSubreddits;
    setShowSubreddits(newShowReplies);
  };

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
             // display: (showSubreddits && size.width < 600) && "none"
            }}
            noWrap
            onClick={() => navigate(`/r/${selectedSubreddit}`)}
            variant="h3"
          >
            /r/{selectedSubreddit}
          </Typography>
          {size.width > 600 && (
            <Box
              onClick={toddleSubreddits}
              sx={{ margin: "0 auto", width: "35%"}}
            >
              <Search />
            </Box>
          )}

          {size.width < 600 && (
              <><Box onClick={toddleSubreddits}>
                <Search />
                <Card
                sx={{
                  position: "absolute",
                  top: "56px",
                 // backgroundColor: " #e6e6e6",
                  right: "1rem",
                  left: "1rem",
                  display: showSubreddits ? "display" : "none",
                 boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
                }}
              >
                <Subreddits toddleSubreddits={toddleSubreddits} />
              </Card>
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