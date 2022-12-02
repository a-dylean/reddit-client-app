import React from "react";
import { useParams } from "react-router-dom";
import PageLayout from "./PageLayout";

const PostListsPage = () => {

  const { selectedSubreddit } = useParams();

  return (
    <>
      <PageLayout selectedSubreddit={selectedSubreddit} />
    </>
  );
};

export default PostListsPage;
