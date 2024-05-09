"use client";

import * as React from "react";
import ReactMarkdown from "markdown-to-jsx";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

function MarkdownListItem(props: any) {
  return <Box component="li" sx={{ mt: 1, typography: "body1" }} {...props} />;
}

const CustomImage = ({ children, ...props }: { children: any; props: any }) => {
  const handleError = (event: any) => {
    event.target.style.display = "none";
  };

  return (
    <>
      <br />
      <img {...props} onError={handleError} />
      <br />
    </>
  );
};

const options = {
  overrides: {
    h1: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: "h4",
        component: "h1",
        className: "markdown-text",
      },
    },
    h2: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: "h6",
        component: "h2",
        className: "markdown-text",
      },
    },
    h3: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: "subtitle1",
        className: "markdown-text",
      },
    },
    h4: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: "caption",
        paragraph: true,
        className: "markdown-text",
      },
    },
    p: {
      component: Typography,
      props: { paragraph: true, className: "markdown-text" },
    },
    a: {
      component: Link,
      props: {
        className: "markdown-text",
      },
    },
    li: {
      component: MarkdownListItem,
      props: {
        className: "markdown-text",
      },
    },
    img: {
      props: {
        className: "markdown-img",
      },
      component: CustomImage,
    },
  },
};

export default function Markdown(props: any) {
  return <ReactMarkdown options={options} {...props} />;
}
