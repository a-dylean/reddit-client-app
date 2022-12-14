/* displays Searchbar and enables user to type and filter the output */

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getSubreddits,
  searchSubreddits,
} from "../features/subReddits/subRedditsSlice";
import { debounce } from "lodash";
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const SearchTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "rgba(0, 0, 0, 0.54)",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "rgba(0, 0, 0, 0.54)",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgba(0, 0, 0, 0.54)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(0, 0, 0, 0.54)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgba(0, 0, 0, 0.54)",
    },
  },
});

const searchSubredditsDebounced = debounce((dispatch, searchTerm) => {
  dispatch(searchSubreddits(searchTerm));
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
    <SearchTextField
      type="text"
      id="outlined-basic"
      placeholder="Search Reddit"
      variant="outlined"
      size="small"
      fullWidth
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
