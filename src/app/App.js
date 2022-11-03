import React from "react";
import { Search } from "../features/search/search";
import { Subreddits } from "../features/subReddits/subReddits";
import { Postslist } from "../features/posts/postsList";
import { Comments } from "../features/comments/comments";
import "./app.css";

export const App = () => {
  return (
    <div className="">
      <div className="ui container" style={{ marginTop: "10px" }}>
        <Search />
      </div>
      <div
        className="ui container"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <div className="ui container" style={{ padding: "5px" }}>
          <Postslist />
        </div>
        <div
          className="ui container"
          style={{ padding: "5px", textAlign: "right", width: "200px" }}
        >
          <Subreddits />
        </div>
      </div>
    </div>
  );
};

export default App;
