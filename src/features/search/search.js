/* displays Searchbar and enables user to type and filter the output */

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getSubreddits, searchSubreddits } from "../subReddits/subRedditsSlice";
import { debounce } from "lodash";

import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";

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
          id="standard-basic"
          label="Search Reddit"
          variant="standard"
          value={searchTerm}
          onChange={searchTermChangeHandler}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {searchTerm.length > 0 && (
                  <BackspaceIcon onClick={clearSearchTermHandler} />
                )}
              </InputAdornment>
            ),
            style: {
              width: 300
            }
          }}
        />
  );
};
