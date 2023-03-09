import React from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

export const TextTypography = ({ text }) => {
  return (
    <ReactMarkdown
      children={text}
      remarkPlugins={[gfm]}
      components={{
        p: ({ node, ...props }) => <p style={{ margin: 0 }} {...props} />
      }}
    />
  );
};
