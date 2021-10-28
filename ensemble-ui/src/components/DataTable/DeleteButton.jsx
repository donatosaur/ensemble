import Button from "@material-ui/core/Button";
import React from "react";

export default function DeleteButton({ onClick }) {
  return (
    <>
      <Button
        className="toolbarButton"
        variant="text"
        color="primary"
        size="small"
        aria-label="Delete Entity"
        onClick={onClick}
      >
        <i className="bi bi-trash" />
        {`Delete Selected`}
      </Button>
    </>
  );
}
