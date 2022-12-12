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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Search } from "./search";
import { useNavigate } from "react-router-dom";
import useWindowSize from "./useWindowSize";
import { Subreddits } from "../features/subReddits/subReddits";

const Layout = ({ children, selectedSubreddit }) => {
  const navigate = useNavigate();
  const size = useWindowSize();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar>
        <Toolbar variant="dense">
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
          <Box sx={{ margin: "auto" }}>
            <Search />
          </Box>
          {size.width < 600 && (
            <>
              <IconButton
                size="large"
                aria-label="subreddits"
                onClick={handleOpenUserMenu}
                color="inherit"
              >
                <MenuIcon fontSize="large" />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Subreddits />
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </>
  );
};

export default Layout;
