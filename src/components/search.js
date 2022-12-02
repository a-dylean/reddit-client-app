/* displays Searchbar and enables user to type and filter the output */

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getSubreddits, searchSubreddits } from "../features/subReddits/subRedditsSlice";
import { debounce } from "lodash";

import { TextField, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const searchSubredditsDebounced = debounce((dispatch, ass) => {
  dispatch(searchSubreddits(ass));
}, 500);

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
    <TextField
    type="text"
      id="outlined-basic"
      placeholder="Search Reddit"
      variant="outlined"
      size="small"
      //fullWidth
      value={searchTerm}
      onChange={searchTermChangeHandler}
      autoComplete="off"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            {searchTerm.length > 0 && (
              <CancelOutlinedIcon onClick={clearSearchTermHandler} />
            )}
          </InputAdornment>
        ),
        style: {
          borderRadius: 50,
          backgroundColor: "#fafafa",
          },
        }}
    />
  );
};
