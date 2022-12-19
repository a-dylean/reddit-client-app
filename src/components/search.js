/* displays Searchbar and enables user to type and filter the output */

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getSubreddits,
  searchSubreddits,
} from "../features/subReddits/subRedditsSlice";
import { debounce } from "lodash";
import { styled } from "@mui/material/styles";
import { InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const SearchDiv = styled("div")(() => ({
  position: "relative",
  borderRadius: 50,
  backgroundColor: "#fafafa",
  color: "rgba(0, 0, 0, 0.54)",
  "&:hover": {
    border: "1px solid grey",
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
        width: "15rem",
      },
    },
  },
}));

const searchSubredditsDebounced = debounce((dispatch, searchTerm) => {
  dispatch(searchSubreddits(searchTerm));
}, 250);

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const searchTermChangeHandler = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    searchSubredditsDebounced(dispatch, newSearchTerm);
  };

  const clearSearchTermHandler = () => {
    setSearchTerm("");
    dispatch(getSubreddits());
  };

  return (
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
  );
};
