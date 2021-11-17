import Button from "@mui/material/Button";
import React from "react";

export default function SearchButton({ onClick }) {
  return (
    <>
      <Button
        className="toolbarButton"
        variant="text"
        color="primary"
        size="small"
        aria-label="Search"
        onClick={onClick}
      >
        <i className="bi bi-search" />
        {`Search`}
      </Button>
    </>
  );
}
