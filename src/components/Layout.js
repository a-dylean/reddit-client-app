import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Container,
  Card
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Search } from "./search";
import { useNavigate } from "react-router-dom";
import useWindowSize from "./useWindowSize";
import { Subreddits } from "../features/subReddits/subReddits";


const Layout = ({ children, selectedSubreddit }) => {
  const navigate = useNavigate();
  const size = useWindowSize();
  // const [anchorElUser, setAnchorElUser] = useState(null);

  // const handleShowSubreddits = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  // const handleCloseSubreddits = () => {
  //   setAnchorElUser(null);
  // };

  const [showSubreddits, setShowSubreddits] = useState(false);
  const toddleSubreddits = () => {
    const newShowReplies = !showSubreddits;
    setShowSubreddits(newShowReplies);
  }

  return (
    <>
      <AppBar>
        <Toolbar>
          {size.width > 600 && (<Typography
            sx={{
              color: "white",
              cursor: "pointer",
            }}
            onClick={() => navigate(`/r/${selectedSubreddit}`)}
            variant="h5"
          >
            /r/{selectedSubreddit}
          </Typography>)}

            {size.width < 600 && (<>
              <IconButton
                size="large"
                aria-label="subreddits"
                onClick={toddleSubreddits}
                color="inherit"
              >
                <MenuIcon fontSize="large" />
              </IconButton>
              {/* <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseSubreddits}
              >
                <MenuItem onClick={handleCloseSubreddits}> */}
                  <Box sx={{display: showSubreddits ? "block" : "none", position: "absolute", top: "51px", left: "0px", backgroundColor: "#FF4300", width: "100%", borderRadius: "4px" }}>
                    <Subreddits toddleSubreddits={toddleSubreddits}/>
                  </Box>
                {/* </MenuItem>
              </Menu> */}
            </>
          )}
          <Box onClick={toddleSubreddits} sx={{position: "absolute", margin: "auto 0", left: "25%"}}>
            <Search />
          </Box>
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </>
  );
};

export default Layout;
