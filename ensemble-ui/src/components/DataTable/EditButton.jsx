import Button from "@material-ui/core/Button";
import React from "react";

export default function EditButton({ onClick }) {
  return (
    <>
      <Button
        className="toolbarButton"
        variant="text"
        color="primary"
        size="small"
        aria-label="Commit Selected Edits"
        onClick={onClick}
      >
        <i className="bi bi-pencil" />
        {` Commit Edits to Selected`}
      </Button>
    </>
  );
}
