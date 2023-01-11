/* displays Searchbar and enables user to type and filter the output */

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchSubreddits } from "../features/subReddits/subRedditsSlice";
import { debounce } from "lodash";
import { styled } from "@mui/material/styles";
import { InputBase, Card } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import SubredditsList from "../features/subReddits/subredditsList";
import { useWindowSize } from "./helperFunctions";
const ParentDiv = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 0,
  [theme.breakpoints.up("sm")]: {
    left: "33%",
    width: "33%",
  },
  [theme.breakpoints.down("sm")]: {
    right: "1rem",
  },
}));

const SearchDiv = styled("div")(({ theme }) => ({
  borderRadius: 50,
  backgroundColor: "#fafafa",
  color: "rgba(0, 0, 0, 0.54)",
  display: "flex",
  alignItems: "center",
  margin: "4.5px auto",
  width: "100%",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    [theme.breakpoints.down("sm")]: {
      width: "0.1ch",
      "&:focus": {
        width: "100%",
      },
    },
  },
}));

const searchSubredditsDebounced = debounce((dispatch, searchTerm) => {
  dispatch(searchSubreddits(searchTerm));
}, 300);

export const Search = ({ hideSudreddit, showSubreddit }) => {
  const size = useWindowSize();
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const searchTermChangeHandler = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    searchSubredditsDebounced(dispatch, newSearchTerm);
  };

  const clearSearchTermHandler = () => {
    setSearchTerm("");
  };

  const [showSubreddits, setShowSubreddits] = useState(false);

  const handleMouseEnter = () => {
    setShowSubreddits(true);
  };

  const handleMouseLeave = () => {
    setShowSubreddits(false);
  };

  return (
    <ParentDiv onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <SearchDiv onClick={(size.width < 400) ? hideSudreddit : undefined}>
        <StyledInputBase
          fullWidth
          placeholder="Search Reddit"
          value={searchTerm}
          onChange={searchTermChangeHandler}
          startAdornment={
            <SearchIcon sx={{ ml: 2, mr: 1, color: "rgba(0, 0, 0, 0.54)" }} />
          }
          inputProps={{ "aria-label": "search" }}
        >
        </StyledInputBase>
        {searchTerm.length > 0 && (
          <CancelOutlinedIcon
            sx={{ mr: 2, color: "rgba(0, 0, 0, 0.54)" }}
            onClick={clearSearchTermHandler}
          />
        )}
      </SearchDiv>
      <Card
        sx={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          display: showSubreddits ? "block" : "none",
        }}
        onClick={() => {
          setShowSubreddits(!showSubreddit);
          showSubreddit();
        }}
      >
        <SubredditsList searchTerm={searchTerm} />
      </Card>
    </ParentDiv>
  );
};
