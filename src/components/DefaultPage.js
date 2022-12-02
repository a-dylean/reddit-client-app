import React from "react";
import { useSelector } from "react-redux";
import PageLayout from "./PageLayout";


const DefaultPage = () => {
  const { selectedSubreddit } = useSelector(
    (state) => state.post
  );

  return (
    <>
      <PageLayout selectedSubreddit={selectedSubreddit} />
    </>
  );
};

export default DefaultPage;
