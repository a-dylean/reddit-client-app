/* displays Searchbar and enables user to type and filter the output */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm, clearSearchTerm } from "./searchSlice";
import { getSubreddits, searchSubreddits } from "../subReddits/subRedditsSlice";

const searchIconUrl = 'https://static-assets.codecademy.com/Courses/Learn-Redux/Recipes-App/icons/search.svg';
const clearIconUrl = 'https://static-assets.codecademy.com/Courses/Learn-Redux/Recipes-App/icons/clear.svg';

export const Search = () => {
    const searchTerm = useSelector(state => state.search.searchTerm);
    const dispatch = useDispatch();

    const onSearchTermChangeHandler = (e) => {
        dispatch(setSearchTerm(e.target.value));
        dispatch(searchSubreddits(searchTerm));
    }

    const onClearSearchTermHandler = () => {
        dispatch(clearSearchTerm());
        dispatch(getSubreddits());
    }
  return (
    <div className="ui segment">
      {/* <form className="ui form">
        <div className="field">
          <label>Subreddits search</label> */}
          
          <div>
            <img id="search-icon" alt="search-icon" src={searchIconUrl} /> 
          <input 
          type="text" 
          value={searchTerm}
          placeholder="Search Reddit"
          onChange={onSearchTermChangeHandler} />
          {searchTerm.length > 0 && (
        <button
          onClick={onClearSearchTermHandler}
          type="button"
          id="search-clear-button"
        >
          <img src={clearIconUrl} alt="clear-button" />
        </button>
      )}
          </div>
        </div>
    //   </form>
    // </div>
  );
};
