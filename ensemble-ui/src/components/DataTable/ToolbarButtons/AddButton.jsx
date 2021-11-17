import Button from "@mui/material/Button";
import React from "react";

export default function AddButton({ onClick }) {
  return (
    <>
      <Button
        className="toolbarButton"
        variant="text"
        color="primary"
        size="small"
        aria-label="Add Entity"
        onClick={onClick}
      >
        <i className="bi bi-plus-lg" />
        {`Add New`}
      </Button>
    </>
  );
}
