/* displays Searchbar and enables user to type and filter the output */

import React from "react";

export const Search = () => {
    return (
        <div className="ui segment">
            <form className="ui form">
                <div className="field">
                    <label>Subreddits search</label>
                    <input type="text" /*onChange={}*//>
                </div>
            </form>
        </div>
    )
}

