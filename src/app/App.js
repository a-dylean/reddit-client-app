import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Search } from "../features/search/search";
import { Subreddits } from "../features/subReddits/subReddits";
import { Postslist } from "../features/posts/postsList";
import "./app.css";
import { useSelector } from "react-redux";
import { Post } from "../features/posts/post";
import { setPageNumber, setPagesVisited } from "./pageSlice";
import { useDispatch } from "react-redux";

export const App = () => {
  const posts = useSelector((state) => state.post.posts);
  const { pageNumber, postsPerPage, pagesVisited } = useSelector(
    (state) => state.page
  );

  const displayPosts = posts
    .slice(pagesVisited, pagesVisited + postsPerPage)
    .map((post) => <Post post={post} key={post.data.id} />);

  const pageCount = Math.ceil(posts.length / postsPerPage);

  const dispatch = useDispatch();
  const handlePageClick = ({ selected }) => {
    dispatch(setPageNumber(selected));
    dispatch(setPagesVisited());

    console.log(selected);
  };

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
          {displayPosts}
        </div>
        <div
          className="ui container"
          style={{ padding: "5px", textAlign: "right", width: "200px" }}
        >
          <Subreddits />
        </div>
      </div>
      <div>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
          forcePage={pageNumber}
        />
      </div>
    </div>
  );
};

export default App;
