/* displays Searchbar and enables user to type and filter the output */

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getSubreddits, searchSubreddits } from "../subReddits/subRedditsSlice";
import { debounce } from "lodash";

const searchIconUrl =
  "https://static-assets.codecademy.com/Courses/Learn-Redux/Recipes-App/icons/search.svg";
const clearIconUrl =
  "https://static-assets.codecademy.com/Courses/Learn-Redux/Recipes-App/icons/clear.svg";

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
    <div className="ui segment">
      <div>
        <img id="search-icon" alt="search-icon" src={searchIconUrl} />
        <input
          type="text"
          value={searchTerm}
          placeholder="Search Reddit"
          onChange={searchTermChangeHandler}
        />
        {searchTerm.length > 0 && (
          <button
            onClick={clearSearchTermHandler}
            type="button"
            id="search-clear-button"
          >
            <img src={clearIconUrl} alt="clear-button" />
          </button>
        )}
      </div>
    </div>
  );
};
