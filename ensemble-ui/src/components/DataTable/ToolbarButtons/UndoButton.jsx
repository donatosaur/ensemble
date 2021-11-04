import Button from "@material-ui/core/Button";
import React from "react";

export default function UndoButton({ onClick }) {
  return (
    <>
      <Button
        className="toolbarButton"
        variant="text"
        color="primary"
        size="small"
        aria-label="Commit Selected"
        onClick={onClick}
      >
        <i className="bi bi-arrow-counterclockwise" />
        {` Undo edits to selected`}
      </Button>
    </>
  );
}
