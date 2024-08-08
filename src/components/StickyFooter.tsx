"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" className="footer-text">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        {process.env.authorName}
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function StickyFooter() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="sm" className="footer-content-container">
        <Typography variant="body1" className="footer-text">
          Next.JS Template
        </Typography>
        <Copyright />
      </Container>
    </Box>
  );
}

export default StickyFooter;
