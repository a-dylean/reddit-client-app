/* displays Searchbar and enables user to type and filter the output */

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  searchSubreddits,
} from "../features/subReddits/subRedditsSlice";
import { debounce } from "lodash";
import { styled } from "@mui/material/styles";
import { InputBase, Box, Card } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import FeaturedSubreddits from "../features/subReddits/featuredSubreddits";

const SearchDiv = styled("div")(({ theme }) => ({

  borderRadius: 50,
  backgroundColor: "#fafafa",
  color: "rgba(0, 0, 0, 0.54)",
  "&:hover": {
    border: "1px solid grey",
  },
  [theme.breakpoints.up("sm")]: {
     position: "absolute",
     margin: "0 auto",
    width: "35%",
    right: "3rem",
    left: "5rem",
  },
  [theme.breakpoints.down("sm")]: {
    position: "relative",
    right: 0,
  },
}));

const FeaturedSubredditsDiv = styled("div")(({ theme }) => ({
  position: "absolute",
  [theme.breakpoints.up("sm")]: {
    width: "35%",
    top: "4rem",
    margin: "0 auto",
    right: "3rem",
    left: "5rem",
  },
  [theme.breakpoints.down("sm")]: {
    top: "3.5rem",
    right: "1rem",
    left: "1rem",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  "& .MuiInputBase-input": {
    width: "100%",
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    [theme.breakpoints.down("sm")]: {
      position: "relative",
      width: "0.001rem",
      "&:focus": {
        width: "100%",
      },
    },
  },
}));

const searchSubredditsDebounced = debounce((dispatch, searchTerm) => {
  dispatch(searchSubreddits(searchTerm));
}, 50);

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const searchTermChangeHandler = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    dispatch(searchSubreddits(newSearchTerm));
    //searchSubredditsDebounced(dispatch, newSearchTerm);
  };

  const clearSearchTermHandler = () => {
    setSearchTerm("");
    //dispatch(getSubreddits());
  };

  const [showSubreddits, setShowSubreddits] = useState(false);

  const toddleFeaturedSubreddits = () => {
    const newShowSubreddits = !showSubreddits;
    setShowSubreddits(newShowSubreddits);
  };

  useEffect(() => {
    toddleFeaturedSubreddits();
  }, [searchTerm]);

  return (
    <>
      <SearchDiv>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          fullWidth
          placeholder="Search Reddit"
          size="small"
          value={searchTerm}
          onChange={searchTermChangeHandler}
          endAdornment={
            searchTerm.length > 0 && (
              <CancelOutlinedIcon
                sx={{ mr: 2, color: "rgba(0, 0, 0, 0.54)" }}
                onClick={clearSearchTermHandler}
              />
            )
          }
        ></StyledInputBase>
      </SearchDiv>
      <FeaturedSubredditsDiv
        onClick={toddleFeaturedSubreddits}
        sx={{ display: showSubreddits ? "none" : "display" }}
      >
        <Card
          sx={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }}
        >
          <FeaturedSubreddits />
        </Card>
      </FeaturedSubredditsDiv>
    </>
  );
};
