import React from "react";
import { Search } from "../features/search/search";
import { Subreddits } from "../features/subReddits/subReddits";
import { Postslist } from "../features/posts/postsList";

export const App = () => {
    return (
        <div>
            <div className="ui container" style={{ marginTop: "10px"}}>
                <Search />
            </div>
            <div className="ui container" style={{ padding: "5px", textAlign: "left"}}>
                <Subreddits/> 
            </div>
            <div>

            </div>
        </div>
    )
}

export default App;