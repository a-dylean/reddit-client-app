import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchSubreddits } from "../features/subReddits/subRedditsSlice";
import { debounce } from "lodash";
import { styled } from "@mui/material/styles";
import { InputBase, Card } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import SubredditsList from "../features/subReddits/subredditsList";
import { useWindowSize } from "../helpers/helperFunctions";

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
  borderRadius: 50, // theme.shape.borderRadius * 50,
  backgroundColor: theme.palette.background.default,
  display: "flex",
  alignItems: "center",
  margin: "4.5px auto",
  width: "100%",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
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

const SuggestedSubreddits = styled(Card)(() => ({
  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
}));

const searchSubredditsDebounced = debounce((dispatch, searchTerm) => {
  dispatch(searchSubreddits(searchTerm));
}, 300);

export const Search = ({ onFocusChange }) => {
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
    size.width < 400 && onFocusChange(false);
  };

  const handleMouseLeave = () => {
    setShowSubreddits(false);
    size.width < 400 && onFocusChange(true);
  };

  return (
    <ParentDiv onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <SearchDiv>
        <StyledInputBase
          fullWidth
          placeholder="Search Reddit"
          value={searchTerm}
          onChange={searchTermChangeHandler}
          onFocus={handleMouseEnter}
          startAdornment={<SearchIcon color="action" sx={{ ml: 2, mr: 1 }} />}
          inputProps={{ "aria-label": "search" }}
        ></StyledInputBase>
        {searchTerm.length > 0 && (
          <CancelOutlinedIcon
            color="action"
            sx={{ mr: 2 }}
            onClick={clearSearchTermHandler}
          />
        )}
      </SearchDiv>
      <SuggestedSubreddits
        sx={{ display: showSubreddits ? "block" : "none"}}
        onClick={handleMouseLeave}
      >
        <SubredditsList searchTerm={searchTerm} />
      </SuggestedSubreddits>
    </ParentDiv>
  );
};
